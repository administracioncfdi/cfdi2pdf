//import necesary functions
var parseData = require("./parseData")
var createPDFContent = require("./createPDFContent")

//EXAMPLE---------------------------
var pdfmakeExample = require("./examples/pdfmakeExample")
var xmlExample = require("./examples/xmlExample")
//----------------------------------

//require parseString
var parseString = require('xml2js').parseString; //Conversion de xml a objeto de javascript
//require pdfmake
var PdfPrinter = require('pdfmake/src/printer');

/**
* creates a pdf of a received cfdi xml in the client
* @param {String} xml xml in string
* @param {Object} font fonts to be used for pdfMake
* @param {Object} response response sent from the server to the client
*/
var createPDFServer = function(xml, fonts, response){
  xml = xmlExample //EXAMPLE
  return parseString(xml, function(err, res){
    if(res){
      var json = parseData(res)
      console.log(json)
      var content = createPDFContent(json)
      console.log(content)
      var printer = new PdfPrinter(fonts);
      var doc = printer.createPdfKitDocument(content);
      //var doc = printer.createPdfKitDocument(pdfmakeExample) //EXAMPLE
      doc.pipe(response)
      doc.end()
    }else{
      throw err
    }
  })
}

module.exports = createPDFServer;
