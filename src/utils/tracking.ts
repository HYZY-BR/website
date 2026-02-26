/**
 * Utility for tracking user behavior and marketing origin.
 */

const ORIGIN_KEY = 'hyzy_marketing_origin';
const BEHAVIOR_KEY = 'hyzy_behavior_analysis';
const SELECTED_PLAN_KEY = 'hyzy_selected_plan';

export interface TrackingData {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    [key: string]: string | undefined;
}

/**
 * Captures UTM parameters from URL and stores them in localStorage.
 * This ensures the original marketing campaign is preserved across sessions.
 */
export const captureUTMsFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const utms: TrackingData = {};
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    let found = false;
    utmKeys.forEach(key => {
        const val = params.get(key);
        if (val) {
            utms[key] = val;
            found = true;
        }
    });

    if (found) {
        localStorage.setItem(ORIGIN_KEY, JSON.stringify(utms));
    }
};

/**
 * Records a specific user behavior (like clicking a CTA button).
 */
export const trackBehavior = (source: string) => {
    localStorage.setItem(BEHAVIOR_KEY, source);
};

/**
 * Records the plan selected by the user.
 */
export const trackPlanSelection = (planId: string) => {
    localStorage.setItem(SELECTED_PLAN_KEY, planId);
};

/**
 * Retrieves the currently selected plan.
 */
export const getSelectedPlan = () => {
    return localStorage.getItem(SELECTED_PLAN_KEY);
};

/**
 * Gets consolidated tracking data.
 * Priority:
 * 1. Current URL UTMs (immediate context)
 * 2. Stored Marketing Origin (localStorage)
 * 3. Stored Behavior Analysis (localStorage)
 */
export const getConsolidatedTracking = (): Record<string, any> | null => {
    // 1. Check current URL
    const params = new URLSearchParams(window.location.search);
    const urlUtms: TrackingData = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
        const val = params.get(key);
        if (val) urlUtms[key] = val;
    });

    if (Object.keys(urlUtms).length > 0) {
        return urlUtms;
    }

    // 2. Check stored marketing origin
    const storedOrigin = localStorage.getItem(ORIGIN_KEY);
    if (storedOrigin) {
        try {
            return JSON.parse(storedOrigin);
        } catch (e) {
            console.error('Error parsing stored origin', e);
        }
    }

    // 3. Check behavior analysis
    const behavior = localStorage.getItem(BEHAVIOR_KEY);
    if (behavior) {
        return {
            utm_source: 'behavior_analysis',
            utm_content: behavior,
            is_internal_behavior: 'true'
        };
    }

    return null;
};

/**
 * Clears behavior tracking after a successful conversion.
 */
export const clearTrackingAfterConversion = () => {
    localStorage.removeItem(BEHAVIOR_KEY);
    localStorage.removeItem(SELECTED_PLAN_KEY);
    // Note: We might want to keep the marketing origin for attribution, 
    // but usually, once converted, it's done for the session.
};

/**
 * Utility to append current query parameters to a new path.
 * This ensures UTMs are preserved during navigation.
 */
export const withCurrentParams = (path: string) => {
    const currentParams = window.location.search;
    if (!currentParams) return path;

    // Check if path already has parameters
    const separator = path.includes('?') ? '&' : '?';
    // Remove the leading '?' from currentParams if it exists
    return `${path}${separator}${currentParams.substring(1)}`;
};
