/**
 * LiftSky24 — Google Apps Script
 * ================================
 * Paste this entire file into Google Apps Script editor,
 * then deploy as a Web App (Anyone can access).
 *
 * HOW TO SETUP:
 * 1. Go to https://sheets.google.com — create a new sheet named "LiftSky24 Contacts"
 * 2. Click Extensions → Apps Script
 * 3. Delete the default code, paste this entire file
 * 4. Click Save (floppy disk icon)
 * 5. Click Deploy → New deployment
 *    - Type: Web App
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone
 * 6. Click Deploy → Copy the Web App URL
 * 7. In your Next.js project, create/edit .env.local and add:
 *    GOOGLE_SHEET_WEBHOOK=<paste the URL here>
 * 8. Restart your dev server: npm run dev
 *
 * The sheet will auto-create headers on first submission.
 */

const SHEET_NAME = "LiftSky24 Contacts";

function doPost(e) {
  try {
    var ss      = SpreadsheetApp.getActiveSpreadsheet();
    var sheet   = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    var data    = JSON.parse(e.postData.contents);

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Message", "Source"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#4a4de6").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    // Append the new enquiry row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name    || "",
      data.email   || "",
      data.details || "",
      data.source  || "website",
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 5);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually in Apps Script to verify sheet access
function testSetup() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  Logger.log("Sheet found: " + sheet.getName());
  Logger.log("Setup complete. Ready to receive form submissions.");
}
