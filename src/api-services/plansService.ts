import { supabase } from "./supabaseClient";
import { Plan, PlanWithPrices, PlanPrice, Subscription, WorkUnitsUsage, PlanCategory } from "@/types/plans";
import { workspaceService } from "./workspaceService";

export const plansService = {
    getPlans: async (): Promise<PlanWithPrices[]> => {
        const { data: plans, error: plansError } = await supabase
            .from('plans')
            .select('*')
            .eq('is_active', true)
            .order('disk_space', { ascending: true }); // Using disk_space as a proxy for tier size order

        if (plansError) throw plansError;

        const { data: prices, error: pricesError } = await supabase
            .from('plan_prices')
            .select('*')
            .eq('is_active', true);

        if (pricesError) throw pricesError;

        // Combine plans and prices
        return (plans || []).map((plan: Plan) => ({
            ...plan,
            prices: (prices || []).filter((price: PlanPrice) => price.plan_id === plan.id)
        })) as PlanWithPrices[];
    },

    getCurrentSubscription: async (): Promise<Subscription | null> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const workspaceId = await workspaceService.getCurrentWorkspaceId();

        if (!workspaceId) return null;

        const { data: subscription, error } = await supabase
            .from('subscriptions')
            .select('*, plans(*)')
            .eq('workspace_id', workspaceId)
            .in('status', ['ACTIVE', 'PENDING'])
            .order('end_date', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error) {
            console.error("Error fetching subscription:", error);
            return null;
        }

        return subscription as Subscription;
    },

    getCurrentUsage: async (): Promise<WorkUnitsUsage | null> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const workspaceId = await workspaceService.getCurrentWorkspaceId();
        if (!workspaceId) return null;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // 1-indexed

        const { data: usage, error } = await supabase
            .from('workunits_usage')
            .select('*')
            .eq('workspace_id', workspaceId)
            .eq('year', currentYear)
            .eq('month', currentMonth)
            .maybeSingle();

        if (error) {
            console.error("Error fetching usage:", error);
            return null;
        }

        // Fetch Consolidated Limits to get the TRUE limit (Plan + Ledger)
        const { data: limitsData } = await supabase.rpc('get_workspace_limits', {
            target_workspace_id: workspaceId
        });

        // Use the RPC limit if available, otherwise fallback to usage table snapshot
        const rpcTotal = limitsData?.limits?.work_units?.total;

        const result = usage as WorkUnitsUsage;
        if (result && rpcTotal !== undefined) {
            return {
                ...result,
                workunits_limit: rpcTotal
            };
        }

        return result;
    },

    getUsageHistory: async (): Promise<WorkUnitsUsage[]> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const workspaceId = await workspaceService.getCurrentWorkspaceId();
        if (!workspaceId) return [];

        const now = new Date();
        const dates = [];

        // Generate last 7 months including current
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            dates.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
        }

        // Fetch usage for these specific months
        const { data, error } = await supabase
            .from('workunits_usage')
            .select('*')
            .eq('workspace_id', workspaceId)
            .order('year', { ascending: true })
            .order('month', { ascending: true })
            .limit(12);

        if (error) {
            console.error("Error fetching usage history:", error);
            return [];
        }

        return data as WorkUnitsUsage[];
    },

    getResourceCounts: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { softwares: 0, credentials: 0 };

        const workspaceId = await workspaceService.getCurrentWorkspaceId();
        if (!workspaceId) return { softwares: 0, credentials: 0 };

        // Count All Softwares
        const { count: softwaresCount } = await supabase
            .from('softwares')
            .select('*', { count: 'exact', head: true })
            .eq('workspace_id', workspaceId)
            .is('deleted_at', null);

        // Count Credentials (Accesses)
        const { count: credentialsCount } = await supabase
            .from('accesses')
            .select('*', { count: 'exact', head: true })
            .eq('workspace_id', workspaceId)
            .is('deleted_at', null);

        return {
            softwares: softwaresCount || 0,
            credentials: credentialsCount || 0
        };
    },

    getPlanCategories: async (): Promise<PlanCategory[]> => {
        const { data, error } = await supabase
            .from('plan_categories')
            .select('*')
            .eq('is_active', true)
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching plan categories:', error);
            throw error;
        }

        return data as PlanCategory[];
    },

    subscribeToPlan: async (planId: string, periodicity: 'MONTHLY' | 'SEMIANNUAL' | 'ANNUAL' | 'ONE_TIME'): Promise<Subscription> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado");

        const workspaceId = await workspaceService.ensureOneWorkspace();

        if (!workspaceId) throw new Error("Usuário não pertence a nenhum workspace");

        // Fetch the stripe_price_id for the selected plan and periodicity
        const { data: planPrice, error: priceError } = await supabase
            .from('plan_prices')
            .select('stripe_price_id')
            .eq('plan_id', planId)
            .eq('periodicity', periodicity)
            .single();

        if (priceError || !planPrice?.stripe_price_id) {
            console.error('Error fetching price ID:', priceError);
            throw new Error("Preço do Stripe não configurado para este plano.");
        }

        console.log("[plansService] Calling checkout function with:", {
            priceId: planPrice.stripe_price_id,
            workspaceId: workspaceId,
            periodicity: periodicity
        });

        const { data, error } = await supabase.functions.invoke('create-checkout-session', {
            body: {
                priceId: planPrice.stripe_price_id,
                workspaceId: workspaceId,
                teamId: workspaceId, // For compatibility with older version of the function
                successUrl: window.location.origin + '/dashboard?session_id={CHECKOUT_SESSION_ID}',
                cancelUrl: window.location.origin + '/plans'
            }
        });

        if (error) {
            console.error('Edge Function error details:', error);
            let descriptiveMessage = "Erro ao criar sessão de checkout.";

            // In Supabase client, error.context is a Response object for FunctionsHttpError
            const anyError = error as any;
            if (anyError.context && typeof anyError.context.json === 'function') {
                try {
                    const errorData = await anyError.context.json();
                    if (errorData.error) {
                        descriptiveMessage = errorData.error;
                    } else if (errorData.message) {
                        descriptiveMessage = errorData.message;
                    }

                    // Specific check for the migration issue
                    if (JSON.stringify(errorData).includes("column") && JSON.stringify(errorData).includes("does not exist")) {
                        descriptiveMessage = "ERRO CRÍTICO: A Edge Function está desatualizada e tentando acessar uma coluna removida do banco de dados. Por favor, faça o deploy da função 'create-checkout-session'.";
                    }
                } catch (e) {
                    console.error("Failed to parse error body", e);
                }
            } else if (error.message) {
                descriptiveMessage = error.message;
            }

            throw new Error(descriptiveMessage);
        }

        if (data?.url) {
            console.log("[plansService] Redirecting to Checkout:", data.url);
            window.location.href = data.url;
        }

        return {} as Subscription;
    }
};
