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
* @param {Object} response response sent from the server to the client
* @param {Object} options options
*/
var createPDFServer = function(xml, response, options){
  options = options || {}
  if(options.fonts){
    //xml = xmlExample //EXAMPLE
    return parseString(xml, function(err, res){
      if(res){
        var json = parseData(res)
        console.log(json)
        var content = createPDFContent(json, options)
        console.log(content)
        var printer = new PdfPrinter(options.fonts);
        var doc = printer.createPdfKitDocument(content);
        //var doc = printer.createPdfKitDocument(pdfmakeExample) //EXAMPLE
        doc.pipe(response)
        doc.end()
      }else{
        throw err
      }
    })
  }else{
    throw new Error("You need to define the fonts to be used in the options")
  }
}

module.exports = createPDFServer;
