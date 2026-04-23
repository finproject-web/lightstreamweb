// Google OAuth Configuration
const GOOGLE_OAUTH_CONFIG = {
    // Your Google OAuth 2.0 Client ID
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    
    // OAuth 2.0 scopes needed
    SCOPES: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ],
    
    // Redirect URI (must match in Google Console)
    REDIRECT_URI: 'https://lightstreamweb.vercel.app/oauth-callback.html',
    
    // Google OAuth endpoints
    AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    TOKEN_URL: 'https://oauth2.googleapis.com/token',
    USERINFO_URL: 'https://www.googleapis.com/oauth2/v2/userinfo',
    
    // Storage keys
    ACCESS_TOKEN_KEY: 'google_access_token',
    REFRESH_TOKEN_KEY: 'google_refresh_token',
    USER_DATA_KEY: 'google_user_data'
};

// Generate OAuth URL
function generateAuthUrl() {
    const params = new URLSearchParams({
        client_id: GOOGLE_OAUTH_CONFIG.CLIENT_ID,
        redirect_uri: GOOGLE_OAUTH_CONFIG.REDIRECT_URI,
        response_type: 'code',
        scope: GOOGLE_OAUTH_CONFIG.SCOPES.join(' '),
        access_type: 'offline',
        prompt: 'consent'
    });
    
    return `${GOOGLE_OAUTH_CONFIG.AUTH_URL}?${params.toString()}`;
}

// Exchange authorization code for access token
async function exchangeCodeForToken(code) {
    const response = await fetch(GOOGLE_OAUTH_CONFIG.TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: GOOGLE_OAUTH_CONFIG.CLIENT_ID,
            client_secret: 'YOUR_GOOGLE_CLIENT_SECRET', // You'll need to add this
            code: code,
            redirect_uri: GOOGLE_OAUTH_CONFIG.REDIRECT_URI,
            grant_type: 'authorization_code'
        })
    });
    
    const data = await response.json();
    return data;
}

// Get user information with access token
async function getUserInfo(accessToken) {
    const response = await fetch(`${GOOGLE_OAUTH_CONFIG.USERINFO_URL}?access_token=${accessToken}`);
    return await response.json();
}
