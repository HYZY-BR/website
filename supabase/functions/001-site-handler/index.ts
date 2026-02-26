import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { type, data } = await req.json()

        // 1. Safety Validations (Anti-Hacker/Spam layer)
        if (!data.email || !data.full_name) {
            throw new Error("Missing mandatory fields")
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.email)) {
            throw new Error("Invalid email format")
        }

        // Size limits (Prevent heavy payloads)
        if (JSON.stringify(data).length > 15000) { // Limit total payload to ~15KB (increased for metadata)
            throw new Error("Payload too large")
        }

        if (data.message && data.message.length > 3000) {
            throw new Error("Message too long (max 3000 chars)")
        }

        // 2. Process based on submission type
        if (type === 'contact') {
            console.log('Processing secure contact request:', data.email)
            // The metadata with UTMs is available in data.metadata
            // Status PENDING is already set by the service
        } else if (type === 'job') {
            console.log('Processing secure job application:', data.email)
            // The metadata with UTMs is available in data.metadata
            // Status PENDING is already set by the service
        }

        return new Response(
            JSON.stringify({ message: "Submission processed successfully" }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400
            }
        )
    }
})
