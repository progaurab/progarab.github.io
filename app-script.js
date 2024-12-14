function doPost(e) {
    // Log the incoming request for debugging
    Logger.log(JSON.stringify(e));
  
    // Access the parameters sent from the form
    var name = e.parameter.name;
    var mobile = e.parameter.mobile;
    var college = e.parameter.college;
    var engagement = e.parameter.engagement;
    var material = e.parameter.material;
    var learnNext = e.parameter.learnNext;
  
    // Open the Google Sheet by ID and name
    var sheet = SpreadsheetApp.openById("1zDGUxh6zjjjScTO69lvJqIOXSW88jQmugVjH06K5EDA").getSheetByName("Sheet1");

  
    // Append a new row with form data
    sheet.appendRow([name, mobile, college, engagement, material, learnNext, new Date()]);
  
    // Set CORS headers to allow requests from any origin
    var headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain"
    };
  
    // Return success message
    return ContentService.createTextOutput("Success")
                         .setMimeType(ContentService.MimeType.PLAIN_TEXT)
                         .setHeaders(headers);
  }
  
