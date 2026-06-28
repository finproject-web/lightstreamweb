// Supabase Client Configuration
const SUPABASE_URL = 'https://vvliylvdziszxeyttvyx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_iCPu8iBlDaGBpctVmQoTAA_pCLAg_xK';

// Load Supabase CDN and initialize client
(function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        console.log('Supabase client already exists');
        return;
    }

    if (typeof supabase !== 'undefined') {
        window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase client initialized');
    } else {
        // Load Supabase CDN dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.async = true;
        script.onload = function() {
            window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase client initialized after CDN load');
        };
        document.head.appendChild(script);
    }
})();
