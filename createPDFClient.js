//import necesary functions
var parseData = require("./parseData").parseData()
var createPDF = require("./createPDFContent").createPDFContent()

//EXAMPLE---------------------------
var pdfmakeExample = require("./pdfmakeExample").pdfmakeExample
var xmlExample = require("./xmlExample").xmlExample
//----------------------------------

//require parseString
var parseString = require('xml2js').parseString; //Conversion de xml a objeto de javascript
//require pdfmake
require('pdfmake/build/pdfmake.js')
require('pdfmake/build/vfs_fonts.js');

/**
* creates a pdf of a received cfdi xml in the client
* @param {String} xml xml in string
*/
var createPDFClient = function(xml){
  xml = xmlExample //EXAMPLE
  parseString(xml, function(err, res){
    if(res){
      var json = parseData(result)
      console.log(json)
      var content = createPDFContent(json)
      console.log(content)
      //pdfMake.createPdf(content).open()
      pdfMake.createPdf(pdfmakeExmaple).open() //EXAMPLE
    }else{
      throw err
    }
  })
}
