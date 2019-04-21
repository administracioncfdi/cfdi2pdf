// import all catalogues
const claveUnidadCatalogue = require('./catalogues/claveUnidad');
const formaPagoCatalogue = require('./catalogues/formaPago');
const impuestoCatalogue = require('./catalogues/impuesto');
const metodoPagoCatalogue = require('./catalogues/metodoPago');
const monedaCatalogue = require('./catalogues/moneda');
const regimenFiscalCatalogue = require('./catalogues/regimenFiscal');
const tipoDeComprobanteCatalogue = require('./catalogues/tipoDeComprobante');
const tipoRelacionCatalogue = require('./catalogues/tipoRelacion');
const usoCFDICatalogue = require('./catalogues/usoCFDI');
const toCurrency = require('./toCurrency');
const { formatCurrency, breakEveryNCharacters } = require('./utils');
const { checkIfExists } = require('./check');

const generateConceptsTable = conceptos => {
  const arr = conceptos.map(concepto => [
    concepto.clave,
    concepto.cantidad,
    concepto.claveUnidad,
    claveUnidadCatalogue[concepto.claveUnidad],
    concepto.descripcion,
    `${formatCurrency(concepto.valorUnitario)}`,
    `${formatCurrency(concepto.descuento)}`,
    impuestoCatalogue[concepto.impuestoTraslado] ? `${concepto.impuestoTraslado} - ${impuestoCatalogue[concepto.impuestoTraslado]}` : '',
    `${formatCurrency(concepto.importeTraslado)}`,
    `${formatCurrency(concepto.importe)}`,
  ]);
  arr.unshift([
    'ClaveProdServ',
    'Cant',
    'Clave Unidad',
    'Unidad',
    'Descripción',
    'Valor Unitario',
    'Descuento',
    {
      colSpan: 2,
      text: 'Impuesto',
    },
    '',
    'Importe',
  ]);
  arr.unshift([
    {
      text: 'PARTIDAS DEL COMPROBANTE',
      style: 'tableHeader',
      colSpan: 10,
      alignment: 'center',
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  return arr;
};

const generateRelatedDocs = docs => {
  const arr = docs.map(doc => [
    doc.uuid,
    doc.metodoPago,
    doc.moneda,
    doc.tipoCambio,
    doc.numParcialidad,
    `${formatCurrency(doc.saldoAnterior)}`,
    `${formatCurrency(doc.importePagado)}`,
    `${formatCurrency(doc.saldoInsoluto)}`,
  ]);
  arr.unshift([
    'UUID',
    'Método de Pago',
    'Moneda',
    'Tipo de Cambio',
    'Num. Parcialidad',
    'Importe Saldo Anterior',
    'Importe Pagado',
    'Importe Saldo Insoluto',
  ]);
  arr.unshift([
    {
      text: 'DOCUMENTOS RELACIONADOS',
      style: 'tableHeader',
      colSpan: 8,
      alignment: 'center',
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  return arr;
};

const generatePayments = pagos => {
  const arr = pagos.map(pago => [
    {
      style: 'tableContent',
      table: {
        widths: [95, '*', 95, '*'],
        body: [
          [
            {
              text: 'INFORMACIÓN DE PAGO',
              style: 'tableHeader',
              colSpan: 4,
              alignment: 'center',
            },
            {},
            {},
            {},
          ],
          [
            'FECHA:',
            pago.fecha,
            'FORMA PAGO:',
            formaPagoCatalogue[pago.formaPago] ? `${pago.formaPago} - ${formaPagoCatalogue[pago.formaPago]}` : '',
          ],
          [
            'MONEDA:',
            monedaCatalogue[pago.moneda] ? `${pago.moneda} - ${monedaCatalogue[pago.moneda]}` : '',
            'MONTO:',
            `${formatCurrency(pago.monto)}`,
          ],
          pago.tipoCambio ? ['TIPO DE CAMBIO:', pago.tipoCambio, '', ''] : ['', '', '', ''],
        ],
      },
      layout: 'lightHorizontalLines',
    },
    '\n',
    {
      style: 'tableList',
      table: {
        widths: ['*', 'auto', 'auto', 30, 20, 'auto', 'auto', 'auto'],
        body: generateRelatedDocs(pago.doctoRelacionados),
      },
      layout: {
        fillColor(i) {
          return i % 2 !== 0 ? '#CCCCCC' : null;
        },
      },
    },
    '\n',
  ]);
  // eslint-disable-next-line
  return [].concat.apply([], arr);
};

const generateQrCode = json => {
  const template = 'https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?id={id}&re={re}&rr={rr}&tt={tt}&fe={fe}';
  const qrCode = template
    .replace('{id}', json.timbreFiscalDigital.uuid)
    .replace('{re}', json.emisor.rfc)
    .replace('{rr}', json.receptor.rfc)
    .replace('{tt}', json.total)
    .replace(
      '{fe}',
      json.timbreFiscalDigital.selloCFD.substring(json.timbreFiscalDigital.selloCFD.length - 8, json.timbreFiscalDigital.selloCFD.length),
    );
  return qrCode;
};

const generateStampTable = json => {
  const arr = [];
  if (json.timbreFiscalDigital) {
    const fechaHoraCertificacion = json.timbreFiscalDigital.fechaTimbrado;
    arr.push(
      [
        {
          colSpan: 1,
          rowSpan: 8,
          qr: generateQrCode(json),
          fit: 140,
        },
        '',
        '',
      ],
      ['', 'NUMERO SERIE CERTIFICADO SAT', checkIfExists(json.timbreFiscalDigital.noCertificadoSAT)],
      ['', 'NUMERO SERIE CERTIFICADO EMISOR', checkIfExists(json.noCertificado)],
      ['', 'FECHA HORA CERTIFICACION', fechaHoraCertificacion],
      ['', 'FOLIO FISCAL UUID', checkIfExists(json.timbreFiscalDigital.uuid)],
      ['', 'SELLO DIGITAL', breakEveryNCharacters(checkIfExists(json.timbreFiscalDigital.selloCFD), 86)],
      ['', 'SELLO DEL SAT', breakEveryNCharacters(checkIfExists(json.timbreFiscalDigital.selloSAT), 86)],
    );
  }
  arr.push(['', 'CADENA ORIGINAL CC:', { text: breakEveryNCharacters(json.cadenaOriginalCC, 86) }]);
  return arr;
};

// generate content array used in PDFMake
const generateContent = (json, logo, text) => {
  let content = [];
  // this block contains the logo image and general information
  content.push({
    alignment: 'center',
    style: 'tableContent',
    table: {
      widths: ['*', 'auto', 'auto'],
      fontSize: 9,
      body: [
        [{ rowSpan: 5, image: logo, fit: [260, 260] }, 'SERIE:', json.serie],
        ['', 'FOLIO:', json.folio],
        ['', 'FECHA:', json.fecha],
        ['', 'EXPEDICION:', json.lugar],
        [
          '',
          'COMPROBANTE:',
          tipoDeComprobanteCatalogue[json.tipoDeComprobante]
            ? `${json.tipoDeComprobante} - ${tipoDeComprobanteCatalogue[json.tipoDeComprobante]}`
            : '',
        ],
      ],
    },
    layout: 'lightHorizontalLines',
  });
  // space
  content.push('\n');
  // this block contains info. about "emisor" object
  content.push({
    style: 'tableContent',
    table: {
      widths: ['auto', '*', 'auto', 'auto'],
      body: [
        [
          {
            text: 'EMISOR',
            style: 'tableHeader',
            colSpan: 4,
            alignment: 'center',
          },
          {},
          {},
          {},
        ],
        ['NOMBRE:', checkIfExists(json.emisor.nombre), 'RFC:', checkIfExists(json.emisor.rfc)],
        [
          'REGIMEN FISCAL:',
          {
            colSpan: 3,
            text: regimenFiscalCatalogue[json.emisor.regimenFiscal]
              ? `${json.emisor.regimenFiscal} - ${regimenFiscalCatalogue[json.emisor.regimenFiscal]}`
              : '',
          },
          '',
        ],
      ],
    },
    layout: 'lightHorizontalLines',
  });
  // space
  content.push('\n');
  // this block contains info. about "receptor" object
  content.push({
    style: 'tableContent',
    table: {
      widths: ['auto', '*', 'auto', 'auto'],
      body: [
        [
          {
            text: 'RECEPTOR',
            style: 'tableHeader',
            colSpan: 4,
            alignment: 'center',
          },
          {},
          {},
          {},
        ],
        ['NOMBRE:', checkIfExists(json.receptor.nombre), 'RFC:', checkIfExists(json.receptor.rfc)],
        [
          'RESIDENCIA FISCAL:',
          checkIfExists(json.receptor.residenciaFiscal),
          'USO CFDI:',
          usoCFDICatalogue[json.receptor.usoCFDI] ? `${json.receptor.usoCFDI} - ${usoCFDICatalogue[json.receptor.usoCFDI]}` : '',
        ],
        ['NUMERO ID TRIB.:', { colSpan: 3, text: json.receptor.numRegIdTrib }, ''],
      ],
    },
    layout: 'lightHorizontalLines',
  });
  // space
  content.push('\n');
  // check type of invoice
  if (json.tipoDeComprobante.toUpperCase() === 'I' || json.tipoDeComprobante.toUpperCase() === 'E') {
    // this block contains general info. about the invoice
    content.push({
      style: 'tableContent',
      table: {
        widths: [95, '*', 95, '*'],
        body: [
          [
            {
              text: 'DATOS GENERALES DEL COMPROBANTE',
              style: 'tableHeader',
              colSpan: 4,
              alignment: 'center',
            },
            {},
            {},
            {},
          ],
          [
            'MONEDA:',
            monedaCatalogue[json.moneda] ? `${json.moneda} - ${monedaCatalogue[json.moneda]}` : '',
            'FORMA PAGO:',
            formaPagoCatalogue[json.formaPago] ? `${json.formaPago} - ${formaPagoCatalogue[json.formaPago]}` : '',
          ],
          ['TIPO DE CAMBIO:', json.tipoCambio, 'CONDICIONES DE PAGO:', json.condicionesDePago],
          [
            'CLAVE CONFIRMACION:',
            json.confirmacion,
            'METODO DE PAGO:',
            metodoPagoCatalogue[json.metodoPago] ? `${json.metodoPago} - ${metodoPagoCatalogue[json.metodoPago]}` : '',
          ],
        ],
      },
      layout: 'lightHorizontalLines',
    });
    // space
    content.push('\n');
  }
  // this block contains the concepts of the invoice
  content.push({
    style: 'tableList',
    table: {
      widths: ['auto', 'auto', 'auto', 'auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
      body: generateConceptsTable(json.conceptos),
    },
    layout: {
      fillColor(i) {
        return i % 2 !== 0 ? '#CCCCCC' : null;
      },
    },
  });
  // space
  content.push('\n');
  // check type of invoice
  if (json.tipoDeComprobante.toUpperCase() === 'I' || json.tipoDeComprobante.toUpperCase() === 'E') {
    // this block contains currency related info.
    content.push({
      style: 'tableContent',
      table: {
        widths: ['auto', '*', 'auto', '*'],
        body: [
          [
            {
              text: 'CFDI RELACIONADO',
              style: 'tableHeader',
              colSpan: 4,
              alignment: 'center',
            },
            {},
            {},
            {},
          ],
          [
            'TIPO RELACION:',
            tipoRelacionCatalogue[json.cfdiRelacionado.tipoRelacion]
              ? `${json.cfdiRelacionado.tipoRelacion} - ${tipoRelacionCatalogue[json.cfdiRelacionado.tipoRelacion]}`
              : '',
            'CFDI RELACIONADO:',
            checkIfExists(json.cfdiRelacionado.uuid),
          ],
          ['SUBTOTAL:', `${formatCurrency(json.subTotal)}`, 'TOTAL:', `${formatCurrency(json.total)}`],
          ['DESCUENTO:', `${formatCurrency(json.descuento)}`, { text: 'IMPORTE CON LETRA:' }, { text: toCurrency(parseFloat(json.total)) }],
          [
            'TOTAL IMP. TRASLADADOS:',
            `${formatCurrency(json.totalImpuestosTrasladados)}`,
            'TOTAL IMP. RETENIDOS:',
            `${formatCurrency(json.totalImpuestosRetenidos)}`,
          ],
        ],
      },
      layout: 'lightHorizontalLines',
    });
    // space
    content.push('\n');
  }
  // check type of invoice
  if (json.tipoDeComprobante.toUpperCase() === 'P') {
    // this block contains info. about payment
    content = content.concat(generatePayments(json.pagos));
  }
  if (text) {
    // observations
    content.push({
      style: 'tableContent',
      table: {
        widths: ['*'],
        body: [[{ text: 'OBSERVACIONES', style: 'tableHeader' }], [text]],
      },
      layout: 'lightHorizontalLines',
    });
    // space
    content.push('\n');
  }
  // this block contains info. about the stamp
  content.push({
    style: 'tableSat',
    table: {
      widths: ['auto', 'auto', '*'],
      body: generateStampTable(json),
    },
    layout: 'lightHorizontalLines',
  });
  return content;
};

/**
 * Receives a json and returns a pdf content object for pdfmake
 * @param {Object} json result json from using parseData function
 */
const createPDFContent = (json, options) => {
  // look for a base64 image
  // eslint-disable-next-line
  const logo = options.image || require('./examples/defaultImage.js');
  const dd = {
    content: generateContent(json, logo, options.text),
    styles: {
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: 'black',
      },
      tableContent: {
        fontSize: 8,
        color: 'black',
        alignment: 'left',
      },
      tableList: {
        fontSize: 7,
        color: 'black',
        alignment: 'center',
      },
      tableSat: {
        font: 'Courier',
        fontSize: 5,
        color: 'black',
        alignment: 'left',
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
    footer() {
      return {
        style: 'tableContent',
        table: {
          widths: ['auto', '*', 'auto', 'auto'],
          body: [
            [
              {
                text: 'Este documento es una representación impresa de un CFDI',
                style: 'tableList',
                colSpan: 4,
                alignment: 'center',
              },
              {},
              {},
              {},
            ],
          ],
        },
        layout: 'lightHorizontalLines',
      };
    },
  };
  return dd;
};

module.exports = createPDFContent;
