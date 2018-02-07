var checkIfValue = require("./check").checkIfValue
var checkIfExists = require("./check").checkIfExists
/**
* Receives a parsed XML resulting from using the dependency xml2js
* and returns the relevant information in a simple json (THIS IS ONLY VALID FOR 3.3)
* @param {String} parsedXml parsed xml
*/
var parseData = function(parsedXml){
  //inicializar variables
  var obj = {}
  //obtener comprobante de xml
  var comprobante = parsedXml['cfdi:Comprobante']
  if(comprobante){
    //obtener datos generales
    obj.serie = checkIfExists(comprobante['$']['Serie'])
    obj.folio = checkIfExists(comprobante['$']['Folio'])
    obj.fecha = checkIfExists(comprobante['$']['Fecha'])
    obj.lugar = checkIfExists(comprobante['$']['LugarExpedicion'])
    obj.tipoDeComprobante = checkIfExists(comprobante['$']['TipoDeComprobante'])
    obj.moneda = checkIfExists(comprobante['$']['Moneda'])
    obj.formaPago = checkIfExists(comprobante['$']['FormaPago'])
    obj.tipoCambio = checkIfExists(comprobante['$']['TipoCambio'])
    obj.metodoPago = checkIfExists(comprobante['$']['MetodoPago'])
    obj.condicionesDePago = checkIfExists(comprobante['$']['CondicionesDePago'])
    obj.confirmacion = checkIfExists(comprobante['$']['Confirmacion'])
    //initializar el objeto emisor
    obj.emisor = {}
    //obtner emisor del comprobante
    var comprobanteEmisor = comprobante['cfdi:Emisor']
    if(comprobanteEmisor){
      //generar objeto emisor
      obj.emisor.rfc = checkIfExists(comprobanteEmisor[0]['$']['Rfc'])
      obj.emisor.nombre = checkIfExists(comprobanteEmisor[0]['$']['Nombre'])
      obj.emisor.regimen = checkIfExists(comprobanteEmisor[0]['$']['RegimenFiscal'])
    }
    //inicializar objeto receptor
    obj.receptor = {}
    //obtener receptor del comprobante
    var comprobanteReceptor = comprobante['cfdi:Receptor']
    if(comprobanteReceptor){
      //generar objeto receptor
      obj.receptor.rfc = checkIfExists(comprobanteReceptor[0]['$']['Rfc'])
      obj.receptor.nombre = checkIfExists(comprobanteReceptor[0]['$']['Nombre'])
      obj.receptor.residenciaFiscal =  checkIfExists(comprobanteReceptor[0]['$']['ResidenciaFiscal'])
      obj.receptor.numRegIdTrib = checkIfExists(comprobanteReceptor[0]['$']['NumRegIdTrib'])
      obj.receptor.usoCFDI = checkIfExists(comprobanteReceptor[0]['$']['UsoCFDI'])
    }
    //inicializar arreglo de conceptos
    obj.conceptos = []
    //obtener conceptos del comprobante
    var comprobanteConceptos = comprobante['cfdi:Conceptos']
    if(comprobanteConceptos){
      var comprobanteConcepto = comprobanteConceptos[0]['cfdi:Concepto']
      if(comprobanteConcepto){
        obj.conceptos = comprobanteConcepto.map(function(concepto){
          var traslado
          var impuestos = concepto['cfdi:Impuestos']
          if(impuestos){
            var traslados = impuestos[0]['cfdi:Traslados']
            if(traslados){
              traslado = traslados[0]['cfdi:Traslado']
            }
          }
          return {
            clave: checkIfExists(concepto['$']['ClaveProdServ']),
            cantidad: checkIfValue(concepto['$']['Cantidad']),
            valorUnitario: checkIfValue(concepto['$']['ValorUnitario']),
            unidad: checkIfExists(concepto['$']['ClaveUnidad']),
            importe: checkIfValue(concepto['$']['Importe']),
            descripcion: checkIfExists(concepto['$']['Descripcion']),
            descuento: checkIfValue(concepto['$']['Descuento']),
            impuesto: traslado ? checkIfExists(traslado[0]['$']['Impuesto']) : "",
            importeImpuesto: traslado ? checkIfValue(traslado[0]['$']['Importe']) : "0"
          }
        })
      }
    }
    //inicializar objeto cfdiRelacionado
    obj.cfdiRelacionado = { }
    //obtener cfdiRelacionado del comprobante
    var comprobanteCfdiRelacionados = comprobante['cfdi:CfdiRelacionados']
    if(comprobanteCfdiRelacionados){
      var comprobanteCfdiRelacionado = comprobanteCfdiRelacionados[0]['cfdi:CfdiRelacionado']
      if(comprobanteCfdiRelacionado){
        //generar objeto CfdiRelacionado
        obj.cfdiRelacionado.tipoRelacion = checkIfExists(comprobanteCfdiRelacionados[0]['$']['TipoRelacion'])
        obj.cfdiRelacionado.uuid = checkIfExists(comprobanteCfdiRelacionado[0]['$']['UUID'])
      }
    }
    //inicializar objeto timbreFiscalDigital
    obj.timbreFiscalDigital = {}
    //obtener complemento del comprobante
    var comprobanteComplemento = comprobante['cfdi:Complemento']
    console.log(comprobanteComplemento)
    if(comprobanteComplemento){
      //obtener el timbre fiscal digital del comprobante
      comprobanteTimbreFiscalDigital = comprobanteComplemento[0]['tfd:TimbreFiscalDigital']
      console.log(comprobanteTimbreFiscalDigital)
      if(comprobanteTimbreFiscalDigital){
        //generar objecto timbreFiscalDigital
        obj.timbreFiscalDigital.uuid = checkIfExists(comprobanteTimbreFiscalDigital[0]['$']['UUID'])
        obj.timbreFiscalDigital.fechaTimbrado = checkIfExists(comprobanteTimbreFiscalDigital[0]['$']['FechaTimbrado'])
        obj.timbreFiscalDigital.selloSAT = checkIfExists(comprobanteTimbreFiscalDigital[0]['$']['SelloSAT'])
        obj.timbreFiscalDigital.selloCFD = checkIfExists(comprobanteTimbreFiscalDigital[0]['$']['SelloCFD'])
        obj.timbreFiscalDigital.noCertificadoSAT = checkIfExists(comprobanteTimbreFiscalDigital[0]['$']['NoCertificadoSAT'])
      }
    }
    //obtener subtotal
    obj.subTotal = checkIfValue(comprobante['$']['SubTotal'])
    //obtener descuento
    obj.descuento = checkIfValue(comprobante['$']['Descuento'])
    //obtener total
    obj.total = checkIfValue(comprobante['$']['Total'])
    //obtener impuestos del comprobante
    var comprobanteImpuestos = comprobante['cfdi:Impuestos']
    if(comprobanteImpuestos){
      obj.totalImpuestosRetenidos = checkIfValue(comprobanteImpuestos[0]['$']['TotalImpuestosRetenidos'])
      obj.totalImpuestosTrasladados = checkIfValue(comprobanteImpuestos[0]['$']['TotalImpuestosTrasladados'])
    }
  }
  return obj
}

module.exports = parseData
