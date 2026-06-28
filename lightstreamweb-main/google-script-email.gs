// Google Apps Script for Email Sending
// Deploy this script as a web app to handle email requests from your website
// 
// DEPLOYMENT INSTRUCTIONS:
// 1. Go to https://script.google.com
// 2. Create new project
// 3. Paste this code
// 4. Click Deploy > New Deployment
// 5. Select type: Web App
// 6. Description: Email Service
// 7. Execute as: Me
// 8. Who has access: Anyone
// 9. Copy the web app URL and update in your HTML files

function doPost(e) {
  try {
    // Log incoming request
    console.log('Received POST request');
    console.log('Request data:', e);
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', data);
    
    // Get email details
    const to = data.to || 'lightstreamloanservices@gmail.com';
    const subject = data.subject || 'New Form Submission';
    const body = data.body || '';
    
    console.log('Sending email to:', to);
    console.log('Subject:', subject);
    
    // Send email
    MailApp.sendEmail({
      to: to,
      subject: subject,
      body: body,
      htmlBody: body.replace(/\n/g, '<br>'),
      name: 'LightStream Financial Services'
    });
    
    console.log('Email sent successfully');
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Email sent successfully',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error in doPost:', error);
    console.error('Error stack:', error.stack);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: 'Failed to send email',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests for testing
function doGet(e) {
  try {
    console.log('Received GET request');
    
    return ContentService.createTextOutput(JSON.stringify({
      message: 'Email service is running',
      status: 'active',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error in doGet:', error);
    
    return ContentService.createTextOutput(JSON.stringify({
      message: 'Error',
      error: error.toString(),
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this manually to test email sending
function testEmail() {
  try {
    MailApp.sendEmail({
      to: 'lightstreamloanservices@gmail.com',
      subject: 'Test Email from Google Script',
      body: 'This is a test email to verify the Google Script is working correctly.',
      htmlBody: '<h1>Test Email</h1><p>This is a test email to verify the Google Script is working correctly.</p>',
      name: 'LightStream Financial Services'
    });
    
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Test email failed:', error);
  }
}
