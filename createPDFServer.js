//import necesary functions
var parseData = require("./parseData")
var createPDF = require("./createPDFContent")

//import fonts
var fonts = require("./config.js").fonts

//EXAMPLE---------------------------
var pdfmakeExample = require("./pdfmakeExample")
var xmlExample = require("./xmlExample")
//----------------------------------

//require parseString
var parseString = require('xml2js').parseString; //Conversion de xml a objeto de javascript
//require pdfmake
var PdfPrinter = require('pdfmake/src/printer');
var printer = new PdfPrinter(fonts);

/**
* creates a pdf of a received cfdi xml in the client
* @param {String} xml xml in string
*/
var createPDFServer = function(xml){
  xml = xmlExample //EXAMPLE
  parseString(xml, function(err, res){
    if(res){
      var json = parseData(res)
      console.log(json)
      var content = createPDFContent(json)
      console.log(content)
      //return printer.createPdfKitDocument(content);
      return printer.createPdfKitDocument(pdfmakeExample);
    }else{
      throw err
    }
  })
}

module.exports = createPDFServer;
