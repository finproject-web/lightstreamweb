// EMAIL TEST SCRIPT - Simple version to test email sending
// Copy this into Google Apps Script to test if MailApp.sendEmail works

const SHEET_URL = "https://docs.google.com/spreadsheets/d/REPLACE_WITH_YOUR_NEW_SHEET_ID/edit";

function doGet(e) {
  return HtmlService.createHtmlOutput('Email Test Script - Ready to test email sending');
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Test email sending
    console.log('Testing email to: ericmason007@gmail.com');
    
    MailApp.sendEmail({
      to: "ericmason007@gmail.com",
      subject: "TEST - Email Function Working",
      htmlBody: `
        <h2>Email Test Successful</h2>
        <p>This is a test to verify email sending works.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
        <p>Customer data received:</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `
    });
    
    console.log('✅ Test email sent to ericmason007@gmail.com');
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Email test completed",
      emailSent: true
    }));
    
  } catch (error) {
    console.log('❌ Email test failed: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString(),
      emailSent: false
    }));
  }
}
