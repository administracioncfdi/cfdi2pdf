const { parseString } = require('xml2js');
const PdfPrinter = require('pdfmake/src/printer');

// import necesary functions
const parseData = require('./parseData');
const createPDFContent = require('./createPDFContent');

// EXAMPLE---------------------------
// const pdfmakeExample = require('./examples/pdfmakeExample');
// const xmlExample = require('./examples/xmlExample');
//----------------------------------

/**
 * creates a pdf of a received cfdi xml in the client
 * @param {String} xml xml in string
 * @param {Object} response response sent from the server to the client
 * @param {Object} options options
 */
const createPDFServer = (xml, response, options = {}) => {
  if (options.fonts) {
    // xml = xmlExample //EXAMPLE
    return parseString(xml, (err, res) => {
      if (res) {
        const json = parseData(res);
        console.log(json);
        const content = createPDFContent(json, options);
        console.log(content);
        const printer = new PdfPrinter(options.fonts);
        const doc = printer.createPdfKitDocument(content);
        // var doc = printer.createPdfKitDocument(pdfmakeExample) //EXAMPLE
        doc.pipe(response);
        doc.end();
      } else {
        throw err;
      }
    });
  }
  throw new Error('You need to define the fonts to be used in the options');
};

module.exports = createPDFServer;
