# Google Sheets Setup for Lika Academy

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Lika Academy Submissions"
3. Create 4 tabs (sheets) at the bottom:
   - `enrollments`
   - `contacts`  
   - `newsletter`
   - `referrals`

4. Add headers to each tab:

**enrollments:** timestamp | courseSlug | fullName | email | phone | dob | experience | format | message

**contacts:** timestamp | name | email | phone | message

**newsletter:** timestamp | email

**referrals:** timestamp | yourName | yourEmail | friendName | friendEmail

## Step 2: Create Google Apps Script

1. In your Sheet, go to **Extensions > Apps Script**
2. Replace the code with:

```javascript
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(data.sheet);
  
  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: "Sheet not found: " + data.sheet })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Get headers from first row
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Build row based on headers
  var row = headers.map(function(header) {
    if (header === "timestamp") return data.timestamp || new Date().toISOString();
    return data.row[header] || "";
  });
  
  sheet.appendRow(row);
  
  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy > New Deployment**
4. Select type: **Web app**
5. Set "Execute as": **Me**
6. Set "Who has access": **Anyone**
7. Click **Deploy** and copy the URL

## Step 3: Add URL to Environment

Add to your `.env.local`:
```
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 4: Test

Submit a form on the website and check if data appears in the Google Sheet.
