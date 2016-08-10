/**
 * Generate Google Docs based on a template document and data incoming from a Google Spreadsheet
 *
 * License: MIT
 *
 * Copyright 2013 Mikko Ohtamaa, http://opensourcehacker.com
 */

// Row number from where to fill in the data (2 = first row because 1 is the header row)
var COMPANY_ROW = 2; // <=============================== Adjust this

// Google Doc id from the document template (Get ids from the URL)
var SOURCE_TEMPLATE = ""; // <========================== Adjust this

// In which spreadsheet we have all the customer data
var CUSTOMER_SPREADSHEET = ""; // <===================== Adjust this

// In which Google Drive we toss the target documents
var TARGET_FOLDER = ""; // <============================ Adjust this

/**
 * Return spreadsheet row content as JS array.
 *
 * Note: We assume the row ends when we encounter
 * the first empty cell. This might not be 
 * sometimes the desired behavior.
 *
 * Rows start at 1, not zero based!!! 🙁
 *
 */
function getRowAsArray(sheet, row) {
  var dataRange = sheet.getRange(row, 1, 1, 99);
  var data = dataRange.getValues();
  var columns = [];

  for (i in data) {
    var row = data[i];

    Logger.log("Got row", row);

    for(var l=0; l<99; l++) {
        var col = row[l];
        // First empty column interrupts
        if(!col) {
            break;
        }

        columns.push(col);
    }
  }

  return columns;
}

/**
 * Duplicates a Google Apps doc
 *
 * @return a new document with a given name from the orignal
 */
function createDuplicateDocument(sourceId, name) {
    var source = DriveApp.getFileById(sourceId);
    var newFile = source.makeCopy(name);

    var targetFolder = DriveApp.getFolderById(TARGET_FOLDER);
    targetFolder.addFile(newFile);

    return DocumentApp.openById(newFile.getId());
}

/**
 * Search a paragraph in the document and replaces it with the generated text 
 */
function replaceParagraph(doc, keyword, newText) {
  var body = doc.getBody();
  body.replaceText(keyword, newText);
}

/**
 * Script entry point
 */
function fillData() {

  var data = SpreadsheetApp.openById(CUSTOMER_SPREADSHEET);

  // XXX: Cannot be accessed when run in the script editor?
  // WHYYYYYYYYY? Asking one number, too complex?
  //var COMPANY_ROW = Browser.inputBox("Enter customer number in the spreadsheet", Browser.Buttons.OK_CANCEL);
  if (!COMPANY_ROW) {
      return; 
  }

  // Fetch variable names
  // they are column names in the spreadsheet
  var sheet = data.getSheets()[0];
  var columns = getRowAsArray(sheet, 1);

  Logger.log("Processing columns:" + columns);

  var customerData = getRowAsArray(sheet, COMPANY_ROW);  
  Logger.log("Processing data:" + customerData);

  // Assume third column holds the company name
  var companyName = customerData[2];

  var target = createDuplicateDocument(SOURCE_TEMPLATE, companyName + " Cover Letter");

  Logger.log("Created new document:" + target.getId());

  for (var i = 0; i < columns.length; i++) {
    var key = "{{" + columns[i] + "}}"; 

    var text = customerData[i] || ""; // No Javascript undefined
      
    // Don't replace the whole text, but leave the template text as a label
    // var value = key + " " + text;
      
    // Replace the whole text
    var value = text;
      
    replaceParagraph(target, key, value);
  }
}
