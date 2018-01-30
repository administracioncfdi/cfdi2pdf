//import necesary functions
import parseData from "./parseData"
import createPDF from "./createPDFContent"

//EXAMPLE---------------------------
import pdfmakeExample from "./pdfmakeExample"
import xmlExample from "./xmlExample"
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
export createPDFClient = function(xml){
  xml = xmlExample //EXAMPLE
  parseString(xml, function(err, res){
    if(res){
      var json = parseData(result)
      var content = createPDFContent(json)
      //pdfMake.createPdf(content).open()
      pdfMake.createPdf(pdfmakeExmaple).open() //EXAMPLE
    }else{
      throw err
    }
  })
}
