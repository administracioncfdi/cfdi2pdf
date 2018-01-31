var xmlExample = `
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd" Version="3.3" Serie="ALACO" Folio="154698" Fecha="2017-11-27T14:17:22" Sello="Wnl8bQigrN5ldr2jXf9UUEeNVtvN8H1YDi1XE3RCTb9149VkLTnJXXioB0E8f+7987D+KR8rv7abQNVDkplQ0FXINgMe4QQEFqP+OpluejxKqY3zLph9ikbWx4P/VxtL49nqjxVkcLj7/5sHbg3pQc6jhWWNwhEMG+nGl+RjxDCPiofbJq7K9jpjh5339baKOMlRqV0MFuMqzxiEFFZ4e/f9CXDw1IWefrpa8S/f2XviHhCL5uqbUOKb+x3bdNo0Lqn34I5PbYphAoRjGVLwwzhxCAxCcQzlT7kNnPUBcg7TxlGNYf56u/6oTUHz+bWkyOYOrojzrNGJF+imHpUxVg==" FormaPago="01" NoCertificado="00001000000404124254" Certificado="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" SubTotal="173.14" Descuento="0.00" Moneda="MXN" Total="200.00" TipoDeComprobante="I" MetodoPago="PUE" LugarExpedicion="78280">
  <cfdi:Emisor Rfc="SGA840416P53" Nombre="SUPER GASOLINERA ALAMITOS SA DE CV" RegimenFiscal="601"/>
  <cfdi:Receptor Rfc="QTR0401202G6" Nombre="QUAD TREE SA DE CV" UsoCFDI="P01"/>
  <cfdi:Conceptos>
    <cfdi:Concepto ClaveProdServ="15101506" Cantidad="12.51" ClaveUnidad="LTR" Descripcion="MAGNA(32011)" ValorUnitario="13.84" Importe="173.14">
      <cfdi:Impuestos>
      <cfdi:Traslados>
        <cfdi:Traslado Base="167.88" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="26.86"/>
      </cfdi:Traslados>
      </cfdi:Impuestos>
    </cfdi:Concepto>
  </cfdi:Conceptos>
  <cfdi:Impuestos TotalImpuestosTrasladados="26.86">
    <cfdi:Traslados>
      <cfdi:Traslado Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="26.86"/>
    </cfdi:Traslados>
  </cfdi:Impuestos>
  <cfdi:Complemento>
    <TimbreFiscalDigital xmlns="http://www.sat.gob.mx/TimbreFiscalDigital" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd" Version="1.1" UUID="83313A6D-ADBE-45FF-BE88-D885E242F9B4" FechaTimbrado="2017-11-27T14:15:49" RfcProvCertif="EEL961104G96" SelloCFD="Wnl8bQigrN5ldr2jXf9UUEeNVtvN8H1YDi1XE3RCTb9149VkLTnJXXioB0E8f+7987D+KR8rv7abQNVDkplQ0FXINgMe4QQEFqP+OpluejxKqY3zLph9ikbWx4P/VxtL49nqjxVkcLj7/5sHbg3pQc6jhWWNwhEMG+nGl+RjxDCPiofbJq7K9jpjh5339baKOMlRqV0MFuMqzxiEFFZ4e/f9CXDw1IWefrpa8S/f2XviHhCL5uqbUOKb+x3bdNo0Lqn34I5PbYphAoRjGVLwwzhxCAxCcQzlT7kNnPUBcg7TxlGNYf56u/6oTUHz+bWkyOYOrojzrNGJF+imHpUxVg==" NoCertificadoSAT="00001000000405003200" SelloSAT="eXO/3n0UaqleEN7EX/4Pv42gjwD4DH6JX/iIP23OeX7ocAUTcwkJgbHcYLQSiNU4UK6GnrCQ36PKkVJ3Dv2jxhx01gRv2ty4+hl1VjTD8w9p/BcGngRlGhDGjMKrbI4iqVpf30ysq5qLv8oyUMC107fniyvogFDUpqyO6yE6ArfM5FuJlUcnuF8fmFifvVq+vUmTGPuy9owoxDSUTZ+TC0Fs1UVQ4cNoyd9y5jqQJ2XGhuIYR8oSGCAAZzm1mnF+5yaX122l7kaf0HUvNlSEp0SLck9H8MGeogeUdZrDHdbKKCtQJ5ws8vGzkma01VL2PHzozmmbD7ve90G3rhMjaw=="/>
  </cfdi:Complemento>
</cfdi:Comprobante>`

module.exports = xmlExample
