var XmlData = require("./xmlData")

/**
* Receives a parsed XML resulting from using the dependency xml2js
* and returns the relevant information in a simple json
* @param {String} parsedXml parsed xml
*/
var parseData = function(parsedXml){
  //inicializar variables
  var comprobante, emisor, receptor, uuid, cfdi, fecha, subTotal, descuento, impuestos,  total, conceptos
  //obtener comprobante de xml
  comprobante = parsedXml['cfdi:Comprobante']
  if(comprobante){
    //obtner emisor del comprobante
    var comprobanteEmisor = comprobante['cfdi:Emisor']
    //initializar el objeto emisor
    emisor = {}
    if(comprobanteEmisor){
      //soporte para formato 3.2 y 3.3
      //generar objeto emisor
      emisor.rfc = comprobanteEmisor[0]['$']['Rfc'] ? comprobanteEmisor[0]['$']['Rfc'] : comprobanteEmisor[0]['$']['rfc']
      emisor.nombre = comprobanteEmisor[0]['$']['Nombre'] ? comprobanteEmisor[0]['$']['Nombre'] : comprobanteEmisor[0]['$']['nombre']
      //obtener el domicilio fiscal del emisor
      var comprobanteDomicilio = comprobanteEmisor[0]['cfdi:DomicilioFiscal']
      //inicializar objeto de domicilio
      emisor.domicilio = {}
      if(comprobanteDomicilio){
        //generar objeto domicilio
        emisor.domicilio.calle = comprobanteDomicilio[0]['$']['calle']
        emisor.domicilio.numeroExterior = comprobanteDomicilio[0]['$']['noExterior']
        emisor.domicilio.numeroInterior = comprobanteDomicilio[0]['$']['noInterior']
        emisor.domicilio.colonia = comprobanteDomicilio[0]['$']['colonia']
        emisor.domicilio.codigoPostal = comprobanteDomicilio[0]['$']['codigoPostal']
        emisor.domicilio.municipio = comprobanteDomicilio[0]['$']['municipio']
        emisor.domicilio.estado = comprobanteDomicilio[0]['$']['estado']
      }
      emisor.regimen = comprobanteEmisor[0]['$']['RegimenFiscal'] ? comprobanteEmisor[0]['$']['RegimenFiscal'] : comprobanteEmisor[0]['cfdi:RegimenFiscal'] ? comprobanteEmisor[0]['cfdi:RegimenFiscal'][0]['$']['Regimen'] : undefined
    }
    //obtener receptor del comprobante
    var comprobanteReceptor = comprobante['cfdi:Receptor']
    //inicializar objeto receptor
    receptor = {}
    if(comprobanteReceptor){
      //generar objeto receptor
      receptor.rfc = comprobanteReceptor[0]['$']['Rfc'] ? comprobanteReceptor[0]['$']['Rfc'] : comprobanteReceptor[0]['$']['rfc']
    }
    //obtener complemento del comprobante
    var comprobanteComplemento = comprobante['cfdi:Complemento']
    if(comprobanteComplemento){
      //obtener el timbre fiscal digital del comprobante
      comprobanteTimbreFiscalDigital = comprobanteComplemento[0]['TimbreFiscalDigital'] ? comprobanteComplemento[0]['TimbreFiscalDigital'] : comprobanteComplemento[0]['tfd:TimbreFiscalDigital']
      if(comprobanteTimbreFiscalDigital){
        uuid = comprobanteTimbreFiscalDigital[0]['$']['UUID']
      }
    }
    //obtener cdfi
    cfdi = comprobante['$']['xmlns:cfdi']
    //obtener fecha
    fecha = comprobante['$']['Fecha'] ? comprobante['$']['Fecha'] : comprobante['$']['fecha']
    //obtener subtotal
    subTotal = comprobante['$']['SubTotal'] ? comprobante['$']['SubTotal'] : comprobante['$']['subTotal']
    //obtener impuestos del comprobante
    var comprobanteImpuestos = comprobante['cfdi:Impuestos']
    //inicializar arreglo de impuestos
    impuestos = []
    if(comprobanteImpuestos){
      //obtener traslados del comprobante
      var comprobanteTraslados = comprobanteImpuestos[0]['cfdi:Traslados']
      if(comprobanteTraslados){
        //obtener traslado del comprobante
        var comprobanteTraslado = comprobanteTraslados[0]['cfdi:Traslado']
        if(comprobanteTraslado){
          //generar arreglo de impuestos
          impuestos = comprobanteTraslado.map(function(traslado){
            var impuesto = traslado['$']['Impuesto']
            if(impuesto){
              if(impuesto == "001"){
                impuesto = 'ISR'
              }else{
                impuesto = 'IVA'
              }
            }else{
              impuesto =  traslado['$']['impuesto']
            }
            return {
              impuesto: impuesto,
              importe: traslado['$']['Importe'] ? traslado['$']['Importe'] : traslado['$']['importe']
            }
          })
        }
      }
    }
    //obtener descuento
    descuento = comprobante['$']['Descuento'] ? comprobante['$']['Descuento'] : comprobante['$']['descuento'] ? comprobante['$']['descuento'] : '0'
    //obtener total
    total = comprobante['$']['Total'] ? comprobante['$']['Total'] : comprobante['$']['total']
    //obtener conceptos del comprobante
    var comprobanteConceptos = comprobante['cfdi:Conceptos']
    //inicializar arreglo de conceptos
    conceptos = []
    if(comprobanteConceptos){
      var comprobanteConcepto = comprobanteConceptos[0]['cfdi:Concepto']
      if(comprobanteConcepto){
        conceptos = comprobanteConcepto.map(function(concepto){
          return {
            clave: concepto['$']['ClaveProdServ'],
            cantidad: concepto['$']['Cantidad'] ? concepto['$']['Cantidad'] :concepto['$']['cantidad'],
            valorUnitario: concepto['$']['ValorUnitario'] ? concepto['$']['ValorUnitario'] : concepto['$']['valorUnitario'],
            unidad: concepto['$']['ClaveUnidad'] ? concepto['$']['ClaveUnidad'] : concepto['$']['unidad'],
            importe: concepto['$']['Importe'] ? concepto['$']['Importe'] : concepto['$']['importe'],
            descripcion: concepto['$']['Descripcion'] ? concepto['$']['Descripcion'] : concepto['$']['descripcion'],
            descuento: concepto['$']['Descuento'] ? concepto['$']['Descuento'] : concepto['$']['descuento'] ? concepto['$']['descuento'] : '0'
          }
        })
      }
    }
    var xmlData = new XmlData(emisor, receptor, uuid, cfdi, fecha, subTotal, descuento, impuestos,  total, conceptos)
  }else{
    var xmlData = {}
  }
  return xmlData
}

module.exports = parseData
