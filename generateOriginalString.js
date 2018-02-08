var generatePipe = function(campo){
  return campo ? (campo + "|") : ""
}

var generateOriginalString = function(json){
  var cadenaOriginal = "||"
  cadenaOriginal += generatePipe(json.version)
  cadenaOriginal += generatePipe(json.serie)
  cadenaOriginal += generatePipe(json.folio)
  cadenaOriginal += generatePipe(json.fecha)
  cadenaOriginal += generatePipe(json.formaPago)
  cadenaOriginal += generatePipe(json.noCertificado)
  cadenaOriginal += generatePipe(json.condicionesDePago)
  cadenaOriginal += generatePipe(json.subTotal)
  cadenaOriginal += generatePipe(json.descuento)
  cadenaOriginal += generatePipe(json.moneda)
  cadenaOriginal += generatePipe(json.tipoCambio)
  cadenaOriginal += generatePipe(json.total)
  cadenaOriginal += generatePipe(json.tipoDeComprobante)
  cadenaOriginal += generatePipe(json.metodoPago)
  cadenaOriginal += generatePipe(json.lugar)
  cadenaOriginal += generatePipe(json.confirmacion)
  cadenaOriginal += generatePipe(json.cfdiRelacionado.tipoRelacion)
  cadenaOriginal += generatePipe(json.cfdiRelacionado.uuid)
  cadenaOriginal += generatePipe(json.emisor.rfc)
  cadenaOriginal += generatePipe(json.emisor.nombre)
  cadenaOriginal += generatePipe(json.emisor.regimen)
  cadenaOriginal += generatePipe(json.receptor.rfc)
  cadenaOriginal += generatePipe(json.receptor.nombre)
  cadenaOriginal += generatePipe(json.receptor.residenciaFiscal)
  cadenaOriginal += generatePipe(json.receptor.numRegIdTrib)
  cadenaOriginal += generatePipe(json.receptor.usoCFDI)
  json.conceptos.map(function(concepto){
    cadenaOriginal += generatePipe(concepto.clave)
    cadenaOriginal += generatePipe(concepto.noIdentificacion)
    cadenaOriginal += generatePipe(concepto.cantidad)
    cadenaOriginal += generatePipe(concepto.claveUnidad)
    cadenaOriginal += generatePipe(concepto.unidad)
    cadenaOriginal += generatePipe(concepto.descripcion)
    cadenaOriginal += generatePipe(concepto.valorUnitario)
    cadenaOriginal += generatePipe(concepto.importe)
    cadenaOriginal += generatePipe(concepto.descuento)
    cadenaOriginal += generatePipe(concepto.baseTraslado)
    cadenaOriginal += generatePipe(concepto.impuestoTraslado)
    cadenaOriginal += generatePipe(concepto.tipoFactorTraslado)
    cadenaOriginal += generatePipe(concepto.tasaOCuotaTraslado)
    cadenaOriginal += generatePipe(concepto.importeTraslado)
    cadenaOriginal += generatePipe(concepto.baseRetencion)
    cadenaOriginal += generatePipe(concepto.impuestoRetencion)
    cadenaOriginal += generatePipe(concepto.tipoFactorRetencion)
    cadenaOriginal += generatePipe(concepto.tasaOCuotaRetencion)
    cadenaOriginal += generatePipe(concepto.importeRetencion)
  })
  json.retenciones.map(function(retencion){
    cadenaOriginal += generatePipe(retencion.impuesto)
    cadenaOriginal += generatePipe(retencion.importe)
  })
  cadenaOriginal += generatePipe(json.totalImpuestosRetenidos)
  json.traslados.map(function(traslado){
    cadenaOriginal += generatePipe(traslado.impuesto)
    cadenaOriginal += generatePipe(traslado.tipoFactor)
    cadenaOriginal += generatePipe(traslado.tasaOCuota)
    cadenaOriginal += generatePipe(traslado.importe)
  })
  cadenaOriginal += generatePipe(json.totalImpuestosTrasladados)
  cadenaOriginal += "|"
  console.log(cadenaOriginal)
  return cadenaOriginal
}

module.exports = generateOriginalString
