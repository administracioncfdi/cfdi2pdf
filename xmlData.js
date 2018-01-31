var XmlData = function(emisor, receptor, uuid, cfdi, fecha, subTotal, descuento, impuestos,  total, conceptos){
  this.uuid = uuid
  this.cfdi = cfdi
  this.fecha = fecha
  this.emisor = emisor
  this.receptor = receptor
  this.subTotal = subTotal
  this.descuento = descuento
  this.impuestos = impuestos
  this.total = total
  this.conceptos = conceptos
}

module.exports = XmlData
