//import all catalogues
var claveUnidadCatalogue = require("./catalogues/claveUnidad")
var formaPagoCatalogue = require("./catalogues/formaPago")
var impuestoCatalogue = require("./catalogues/impuesto")
var metodoPagoCatalogue = require("./catalogues/metodoPago")
var monedaCatalogue = require("./catalogues/moneda")
var regimenFiscalCatalogue = require("./catalogues/regimenFiscal")
var tipoDeComprobanteCatalogue = require("./catalogues/tipoDeComprobante")
var tipoRelacionCatalogue = require("./catalogues/tipoRelacion")
var usoCFDICatalogue = require("./catalogues/usoCFDI")
var toCurrency = require("./toCurrency")
var generateOriginalString = require("./generateOriginalString")
var checkIfExists = require("./check").checkIfExists

var generateConceptsTable = function(conceptos){
  var arr = conceptos.map(function(concepto){
    return [concepto.clave, concepto.cantidad, concepto.claveUnidad, claveUnidadCatalogue[concepto.claveUnidad], concepto.descripcion, "$ " + concepto.valorUnitario, "$ " + concepto.descuento,
    impuestoCatalogue[concepto.impuestoTraslado] ? concepto.impuestoTraslado + " - " + impuestoCatalogue[concepto.impuestoTraslado] : "", "$ " + concepto.importeTraslado, "$ " + concepto.importe ]
  })
  arr.unshift(['ClaveProdServ','Cant','Clave Unidad','Unidad','Descripción','Valor Unitario','Descuento',{colSpan: 2, text: 'Impuesto'},'','Importe'])
  arr.unshift([{text: 'PARTIDAS DEL COMPROBANTE', style: 'tableHeader', colSpan: 10, alignment: 'center'},{},{},{},{},{},{},{},{},{}])
  return arr
}

var generateRelatedDocs = function(docs){
  var arr = docs.map(function(doc){
    return [doc.uuid, doc.numParcialidad, "$ " + doc.saldoAnterior, "$ " + doc.importePagado, "$ " + doc.saldoInsoluto]
  })
  arr.unshift(['UUID','Num. Parcialidad','Importe Saldo Anterior','Importe Pagado','Importe Saldo Insoluto'])
  arr.unshift([{text: 'DOCUMENTOS RELACIONADOS', style: 'tableHeader', colSpan: 5, alignment: 'center'},{},{},{},{}])
  return arr
}

var generatePayments = function(pagos){
  var arr = pagos.map(function(pago){
    return [{
          style: 'tableContent',
          table: {
              widths: [95,'*',95,'*'],
              body: [
                  [{text: 'INFORMACIÓN DE PAGO', style: 'tableHeader', colSpan: 4, alignment: 'center'}, {}, {},{}],
                  ['FECHA:', pago.fecha ? pago.fecha.substring(0,10) : "" ,'FORMA PAGO:', formaPagoCatalogue[pago.formaPago] ? pago.formaPago + " - " + formaPagoCatalogue[pago.formaPago] : "" ],
                  ['MONEDA:', monedaCatalogue[pago.moneda] ? pago.moneda + " - " + monedaCatalogue[pago.moneda] : "",'MONTO:', "$ " + pago.monto],
              ]
          },
          layout: 'lightHorizontalLines'
      },
      "\n",
      {
        style: 'tableList',
        table: {
            widths: ['*','auto',75,75,75],
            body: generateRelatedDocs(pago.doctoRelacionados)
        },
        layout: {
          fillColor: function (i, node) {
            return (i % 2 != 0) ? '#CCCCCC' : null;
          }
        }
      },
      "\n"
      ]
  })
  return [].concat.apply([], arr)
}

var generateQrCode = function(json){
  var template = "https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?id={id}&re={re}&rr={rr}&tt={tt}&fe={fe}"
  var qrCode = template
    .replace("{id}", json.timbreFiscalDigital.uuid)
    .replace("{re}", json.emisor.rfc)
    .replace("{rr}", json.receptor.rfc)
    .replace("{tt}", json.total)
    .replace("{fe}", json.timbreFiscalDigital.selloCFD.substring(json.timbreFiscalDigital.selloCFD.length - 8, json.timbreFiscalDigital.selloCFD.length))
  return qrCode
}

var generateStampTable = function(json){
  var arr = []
  if(json.timbreFiscalDigital){
    arr = [
          [{colSpan: 1, rowSpan: 6, qr: generateQrCode(json) , fit:140},'NUMERO SERIE CERTIFICADO',checkIfExists(json.timbreFiscalDigital.noCertificadoSAT)],
          ['', 'FECHA HORA CERTIFICACION', json.timbreFiscalDigital.fechaTimbrado ? json.timbreFiscalDigital.fechaTimbrado.substring(0,10) + json.timbreFiscalDigital.fechaTimbrado.substring(11,19) : ""],
          ['', 'FOLIO FISCAL UUID', checkIfExists(json.timbreFiscalDigital.uuid)],
          ['', 'SELLO DIGITAL', checkIfExists(json.timbreFiscalDigital.selloCFD)],
          ['','SELLO DEL SAT',checkIfExists(json.timbreFiscalDigital.selloSAT)]
      ]
  }
  arr.push(['','CADENA ORIGINAL:',generateOriginalString(json)])
  return arr
}

//generate content array used in PDFMake
var generateContent = function(json, logo, text){
  var content = []
  //this block contains the logo image and general information
  content.push({
    alignment: 'center',
    style: 'tableContent',
    table: {
        widths: ['*','auto','auto'],
        fontSize: 9,
        body: [
          [{rowSpan: 5, image: logo, fit: [260, 260]},'SERIE:', json.serie ],
          ['','FOLIO:', json.folio],
          ['','FECHA:', json.fecha ? json.fecha.substring(0,10) : ""],
          ['','EXPEDICION:', json.lugar],
          ['','COMPROBANTE:', tipoDeComprobanteCatalogue[json.tipoDeComprobante] ? json.tipoDeComprobante + " - " + tipoDeComprobanteCatalogue[json.tipoDeComprobante] : "" ]
        ]
      },
      layout: 'lightHorizontalLines'
  })
  //space
  content.push('\n')
  //this block contains info. about "emisor" object
  content.push({
    style: 'tableContent',
      table: {
          widths: ['auto','*','auto','auto'],
          body: [
              [{text: 'EMISOR', style: 'tableHeader', colSpan: 4, alignment: 'center'}, {}, {},{}],
              ['NOMBRE:', checkIfExists(json.emisor.nombre),'RFC:', checkIfExists(json.emisor.rfc)],
              ['REGIMEN FISCAL:', {colSpan: 3, text: regimenFiscalCatalogue[json.emisor.regimenFiscal] ? json.emisor.regimenFiscal + " - " + regimenFiscalCatalogue[json.emisor.regimenFiscal] : ""},'']
          ]
      },
      layout: 'lightHorizontalLines'
  })
  //space
  content.push('\n')
  //this block contains info. about "receptor" object
  content.push({
    style: 'tableContent',
      table: {
          widths: ['auto','*','auto','auto'],
          body: [
              [{text: 'RECEPTOR', style: 'tableHeader', colSpan: 4, alignment: 'center'}, {}, {},{}],
              ['NOMBRE:', checkIfExists(json.receptor.nombre) ,'RFC:', checkIfExists(json.receptor.rfc)],
              ['RESIDENCIA FISCAL:', checkIfExists(json.receptor.residenciaFiscal),'USO CFDI:', usoCFDICatalogue[json.receptor.usoCFDI] ? json.receptor.usoCFDI + " - " + usoCFDICatalogue[json.receptor.usoCFDI] : "" ],
              ['NUMERO ID TRIB.:', {colSpan: 3, text: json.receptor.numRegIdTrib },'']
          ]
      },
      layout: 'lightHorizontalLines'
  })
  //space
  content.push('\n')
  //check type of invoice
  if(json.tipoDeComprobante.toUpperCase() == "I" || json.tipoDeComprobante.toUpperCase() == "E"){
    //this block contains general info. about the invoice
    content.push({
        style: 'tableContent',
        table: {
            widths: [95,'*',95,'*'],
            body: [
                [{text: 'DATOS GENERALES DEL COMPROBANTE', style: 'tableHeader', colSpan: 4, alignment: 'center'}, {}, {},{}],
                ['MONEDA:', monedaCatalogue[json.moneda] ? json.moneda + " - " + monedaCatalogue[json.moneda] : "" ,'FORMA PAGO:', formaPagoCatalogue[json.formaPago] ? json.formaPago + " - " + formaPagoCatalogue[json.formaPago] : "" ],
                ['TIPO DE CAMBIO:', json.tipoCambio,'CONDICIONES DE PAGO:', json.condicionesDePago],
                ['CLAVE CONFIRMACION:', json.confirmacion,'METODO DE PAGO:', metodoPagoCatalogue[json.metodoPago] ? json.metodoPago + " - " + metodoPagoCatalogue[json.metodoPago] : ""]
            ]
        },
        layout: 'lightHorizontalLines'
    })
    //space
    content.push('\n')
  }
  //this block contains the concepts of the invoice
  content.push({
    style: 'tableList',
    table: {
        widths: ['auto','auto','auto','auto','*','auto','auto','auto','auto','auto'],
        body: generateConceptsTable(json.conceptos)
    },
    layout: {
      fillColor: function (i, node) {
        return (i % 2 != 0) ? '#CCCCCC' : null;
      }
    }
  })
  //space
  content.push('\n')
  //check type of invoice
  if(json.tipoDeComprobante.toUpperCase() == "I" || json.tipoDeComprobante.toUpperCase() == "E"){
    //this block contains currency related info.
    content.push({
      style: 'tableContent',
        table: {
            widths: ['auto','*','auto','*'],
            body: [
                [{text: 'CFDI RELACIONADO', style: 'tableHeader', colSpan: 4, alignment: 'center'}, {}, {},{}],
                ['TIPO RELACION:', tipoRelacionCatalogue[json.cfdiRelacionado.tipoRelacion] ? json.cfdiRelacionado.tipoRelacion + " - " + tipoRelacionCatalogue[json.cfdiRelacionado.tipoRelacion] : "" ,'CFDI RELACIONADO:', checkIfExists(json.cfdiRelacionado.uuid)],
                ['SUBTOTAL:', '$ ' + json.subTotal,'TOTAL:','$ ' + json.total],
                ['DESCUENTO:', '$ ' + json.descuento,{colSpan: 2, text: 'IMPORTE CON LETRA:'},''],
                ['TOTAL IMP. TRASLADADOS:', '$ ' + json.totalImpuestosTrasladados,{colSpan: 2, rowSpan: 2, text: toCurrency(parseFloat(json.total))},''],
                ['TOTAL IMP. RETENIDOS:', '$ ' + json.totalImpuestosRetenidos,'',''],
            ]
        },
        layout: 'lightHorizontalLines'
    })
    //space
    content.push('\n')
  }
  //check type of invoice
  if(json.tipoDeComprobante.toUpperCase() == "P"){
    //this block contains info. about payment
    content = content.concat(generatePayments(json.pagos))
  }
  if(text){
    //observations
    content.push({
      style: 'tableContent',
      table: {
          widths: ['*'],
          body: [
              [{text: 'OBSERVACIONES', style: 'tableHeader'}],
              [text]
          ]
      },
      layout: 'lightHorizontalLines'
    })
    //space
    content.push('\n')
  }
  //this block contains info. about the stamp
  content.push({
    style: 'tableSat',
      table: {
          widths: ['auto','auto','*'],
          body: generateStampTable(json)
      },
      layout: 'lightHorizontalLines'
  })
  return content
}

/**
* Receives a json and returns a pdf content object for pdfmake
* @param {Object} json result json from using parseData function
*/
var createPDFContent = function(json, options){
  //look for a base64 image
  var logo = options.image || require("./examples/defaultImage.js")
  var dd = {
  	content: generateContent(json, logo, options.text),
  	styles: {
  		tableHeader: {
  			bold: true,
  			fontSize: 10,
  			color: 'black'
  		},
      tableContent: {
  			fontSize: 8,
  			color: 'black',
        alignment: 'left'
  		},
      tableList: {
  			fontSize: 7,
  			color: 'black',
        alignment: 'center'
  		},
      tableSat: {
  			fontSize: 5,
  			color: 'black',
        alignment: 'left'
  		}
  	},
  	defaultStyle: {
  		// alignment: 'justify'
  	}
  }
  return dd;
}

module.exports = createPDFContent
