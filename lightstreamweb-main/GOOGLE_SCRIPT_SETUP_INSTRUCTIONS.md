# Google Apps Script Setup Instructions

## Step 1: Open Google Apps Script
1. Go to: https://script.google.com/home
2. Sign in with your Google account

## Step 2: Open/Create Project
1. If you have an existing project, open it
2. If not, click "New Project"

## Step 3: Update Code
1. Delete all existing code in the project
2. Copy the entire content from `working-email-script.js`
3. Paste it into the Google Apps Script editor

## Step 4: Save the Project
1. Click "Save project" (floppy disk icon)
2. Give it a name like "LightStream Form Handler"

## Step 5: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Select type: "Web app"
3. Configure:
   - Description: "LightStream Form Handler"
   - Execute as: "Me" (your Google account)
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy the Web app URL

## Step 6: Test the Setup
1. Open your website locally
2. Fill out a test form
3. Check if:
   - Data appears in your Google Sheet
   - Email arrives at lightstreamloansservices@gmail.com

## Important Notes:
- The email address lightstreamloansservices@gmail.com will receive all form submissions
- Make sure this email address can receive emails
- The Google Sheet should be shared with appropriate permissions if needed
- Keep the Web app URL secure - it's your API endpoint

## Troubleshooting:
- If emails don't arrive, check the Google Apps Script execution logs
- Ensure the Google Sheet has the correct columns
- Verify the Web app URL is correctly configured in your website
