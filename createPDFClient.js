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
require('pdfmake/build/pdfmake.js')
require('pdfmake/build/vfs_fonts.js');

/**
* creates a pdf of a received cfdi xml in the client
* @param {String} xml xml in string
*/
var createPDFClient = function(xml, options){
  options = options || {}
  //xml = xmlExample //EXAMPLE
  parseString(xml, function(err, res){
    if(res){
      var json = parseData(res)
      console.log(json)
      var content = createPDFContent(json, options)
      console.log(content)
      pdfMake.createPdf(content).open()
      //pdfMake.createPdf(pdfmakeExmaple).open() //EXAMPLE
    }else{
      throw err
    }
  })
}

module.exports = createPDFClient;
