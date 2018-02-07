/* EXAMPLE 1
var xmlExample = /* EXAMPLE 1
var xmlExample = `
<cfdi:Comprobante xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd" LugarExpedicion="78250" MetodoPago="PUE" TipoDeComprobante="I" Total="870.00" Moneda="MXN" Certificado="MIIEYjCCA0qgAwIBAgIUMDAwMDEwMDAwMDAzMDMxOTgzMTIwDQYJKoZIhvcNAQEFBQAwggGKMTgwNgYDVQQDDC9BLkMuIGRlbCBTZXJ2aWNpbyBkZSBBZG1pbmlzdHJhY2nDs24gVHJpYnV0YXJpYTEvMC0GA1UECgwmU2VydmljaW8gZGUgQWRtaW5pc3RyYWNpw7NuIFRyaWJ1dGFyaWExODA2BgNVBAsML0FkbWluaXN0cmFjacOzbiBkZSBTZWd1cmlkYWQgZGUgbGEgSW5mb3JtYWNpw7NuMR8wHQYJKoZIhvcNAQkBFhBhY29kc0BzYXQuZ29iLm14MSYwJAYDVQQJDB1Bdi4gSGlkYWxnbyA3NywgQ29sLiBHdWVycmVybzEOMAwGA1UEEQwFMDYzMDAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBEaXN0cml0byBGZWRlcmFsMRQwEgYDVQQHDAtDdWF1aHTDqW1vYzEVMBMGA1UELRMMU0FUOTcwNzAxTk4zMTUwMwYJKoZIhvcNAQkCDCZSZXNwb25zYWJsZTogQ2xhdWRpYSBDb3ZhcnJ1YmlhcyBPY2hvYTAeFw0xNDAzMDUxODA5MjVaFw0xODAzMDUxODA5MjVaMIGuMSEwHwYDVQQDExhFTlJJUVVFIEhJREFMR08gR09OWkFMRVoxITAfBgNVBCkTGEVOUklRVUUgSElEQUxHTyBHT05aQUxFWjEhMB8GA1UEChMYRU5SSVFVRSBISURBTEdPIEdPTlpBTEVaMRYwFAYDVQQtEw1ISUdFNTcwOTI3VUoxMRswGQYDVQQFExJISUdFNTcwOTI3SFNQRE5OMDgxDjAMBgNVBAsTBVVOSUNBMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCESYjzJhvbPxIG1szSuBpUx8bnumnYuViSeXIObqkaxrqDzaspTbw8bp7Eh8UgagRpE/fbeG8FmDUKkyeKWMaze6EJbg2pmtbQgeLxYwLmgJO+XMBSNNN3u+lGstQi/++5y2lHt+smfuphkKXaGjmZV04rMYAomV00C+B/9kNVlQIDAQABox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwIGwDANBgkqhkiG9w0BAQUFAAOCAQEAUzNfH2cfeTfQ0W2Rhzyf7J5DOW4bdyA4uCXLgGn/xiybUnm1GbY4gjO79aT8iUHEgr8cziir3jB8eituiyAmfNAAXuwUCiX8G5k9PeSJmwf+dSOLxuunlarxBnFeYrKW3i9Uu4idkdq+1b6XfSM5E/lsanIiDivuF0T6d6RiOfJbwpmaJBVqka8GaZ38s0pwr2fgBWfS0Vvxk2R9zPf5G6/OnvWKsHfhcRnh1Gag0w1W7Cylo+kEDnCu0nljFeQI7jJccRPdJWYEWTSYnoNIsGTJyCcTEiWowO2L9Q2YPkCv0F4SKKZ1C+/jP2HkHc65LR1mGVFug5KFS3dNft32gQ==" SubTotal="750.00" CondicionesDePago="CONTADO" NoCertificado="00001000000303198312" FormaPago="01" Sello="buHpqvcsycI7BtM3MAyz6vejrTfR4+MNmAwAg5eOOBI0j3Hx0sEr2Tw2PX38XCn1S0oYfXEVelRM+AK1dG04kGa+kzGG2L0aKWdv9lRkJKNWpua1wofji+DkszU21CTQdmRTfWD+GxNITN24Zr8ryQjxoj3cv2ByKpQ73tE5Kwc=" Fecha="2018-01-04T11:09:38" Folio="1280" Version="3.3">
  <cfdi:Emisor Rfc="HIGE570927UJ1" Nombre="ENRIQUE HIDALGO GONZALEZ" RegimenFiscal="621"/>
  <cfdi:Receptor Rfc="QTR0401202G6" Nombre="QUAD TREE S.A. DE C.V." UsoCFDI="G01"/>
  <cfdi:Conceptos>
    <cfdi:Concepto ClaveProdServ="42211506" Cantidad="1" ClaveUnidad="EA" Descripcion="ANDADERA DE ALUMINIO DE DOBLE APOYO PLEGABLE Y AJUSTABLE A LA ALTURA" ValorUnitario="750.00" Importe="750.00">
      <cfdi:Impuestos>
        <cfdi:Traslados>
          <cfdi:Traslado Base="750.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="120.00"/>
        </cfdi:Traslados>
      </cfdi:Impuestos>
    </cfdi:Concepto>
  </cfdi:Conceptos>
  <cfdi:Impuestos TotalImpuestosTrasladados="120.00">
    <cfdi:Traslados>
      <cfdi:Traslado Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="120.00"/>
    </cfdi:Traslados>
  </cfdi:Impuestos>
  <cfdi:Complemento>
    <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd" Version="1.1" UUID="8A45599F-3BB2-40BD-ACA3-D4902358FF99" FechaTimbrado="2018-01-04T11:13:13" RfcProvCertif="SAT970701NN3" SelloCFD="buHpqvcsycI7BtM3MAyz6vejrTfR4+MNmAwAg5eOOBI0j3Hx0sEr2Tw2PX38XCn1S0oYfXEVelRM+AK1dG04kGa+kzGG2L0aKWdv9lRkJKNWpua1wofji+DkszU21CTQdmRTfWD+GxNITN24Zr8ryQjxoj3cv2ByKpQ73tE5Kwc=" NoCertificadoSAT="00001000000403258748" SelloSAT="bSf4J3F/ZMWIjpSrSN8Hhu8/PdGknirDRX4ppI80TAG/CE34nnNLskMELGz/U4emlOQoCgpbhaRKnUsoj9954wNkX6EEM3UovUpPvtkNvDwFUhgtxtha8DIjYlG1bY/u3EDS8xQ/JcTFypOB3Lu+xbIHsQ0wdFgH6TgP7a5Fb4PSwIQIcvw8mvrlygzIWwEqg0HMUh2O/Zi4DMBsZ8mC1Fb56Mp/iAzO5pKKDKrgTAEK7z79nYwJIJ3pDkrmourkTIlQD3FQL3Exk3PAjEEXgNPwEojbpVYLEgT/ZcMH//aSPR0zZmVMEhSupawWFpPsI2c+57qk2A4Nv5UcWeyEAw=="/>
  </cfdi:Complemento>
</cfdi:Comprobante>`*/

/* EXAMPLE 2 */
var xmlExample = `
<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:cfdi="http://www.sat.gob.mx/cfd/3"
    xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd"
    Version="3.3" Serie="A" Folio="123ABC" Fecha="2017-05-20T23:23:59"
    Moneda="MXN" SubTotal="1000" Total="1500"  Descuento="0.00" TipoCambio="1.0"
  TipoDeComprobante="I" FormaPago="02" MetodoPago="PUE" CondicionesDePago="CONDICIONES"
    LugarExpedicion="45079" Confirmacion="Az123"
    NoCertificado="40001000000300000337" Sello="" Certificado="" >
  <cfdi:CfdiRelacionados TipoRelacion="02">
    <cfdi:CfdiRelacionado UUID="ED1752FE-E865-4FF2-BFE1-0F552E770DC9"/>
  </cfdi:CfdiRelacionados>
    <cfdi:Emisor Rfc=" AAA010101AAA" Nombre="Esta es una demostración" RegimenFiscal="622"/>
    <cfdi:Receptor Rfc="BASJ600902KL9" Nombre="Juanito Bananas De la Sierra" ResidenciaFiscal="MEX"
  NumRegIdTrib="987654321" UsoCFDI="G03"/>
    <cfdi:Conceptos>
        <cfdi:Concepto ClaveProdServ="01010101" ClaveUnidad="C81" NoIdentificacion="00001" Cantidad="1.5"
    Unidad="TONELADA" Descripcion="ACERO" ValorUnitario="1500000" Importe="2250000">
            <cfdi:Impuestos>
                <cfdi:Traslados>
                    <cfdi:Traslado Base="2250000" Impuesto="002" TipoFactor="Tasa" TasaOCuota="1.600000" Importe="360000"/>
                </cfdi:Traslados>
                <cfdi:Retenciones>
                    <cfdi:Retencion Base="2250000" Impuesto="001" TipoFactor="Tasa" TasaOCuota="0.300000" Importe="247500"/>
                </cfdi:Retenciones>
            </cfdi:Impuestos>
            <cfdi:CuentaPredial Numero="51888"/>
        </cfdi:Concepto>
        <cfdi:Concepto ClaveProdServ="95141904" ClaveUnidad="WEE" NoIdentificacion="00002" Cantidad="1.6"
    Unidad="TONELADA" Descripcion="ALUMINIO" ValorUnitario="1500" Importe="2400">
            <cfdi:Impuestos>
                <cfdi:Traslados>
                    <cfdi:Traslado Base="2400" Impuesto="002" TipoFactor="Tasa" TasaOCuota="1.600000" Importe="384"/>
                </cfdi:Traslados>
                <cfdi:Retenciones>
                    <cfdi:Retencion Base="2400" Impuesto="001" TipoFactor="Tasa" TasaOCuota="0.300000" Importe="264"/>
                </cfdi:Retenciones>
            </cfdi:Impuestos>
            <cfdi:InformacionAduanera NumeroPedimento="15  48  4567  6001234"/>
        </cfdi:Concepto>
        <cfdi:Concepto ClaveProdServ="84101604" ClaveUnidad="G66" NoIdentificacion="00003" Cantidad="1.7"
    Unidad="TONELADA" Descripcion="ZAMAC" ValorUnitario="10000" Importe="17000" Descuento="0">
            <cfdi:Impuestos>
                <cfdi:Traslados>
                    <cfdi:Traslado Base="17000" Impuesto="002" TipoFactor="Tasa" TasaOCuota="1.600000" Importe="2720" />
                </cfdi:Traslados>
                <cfdi:Retenciones>
                    <cfdi:Retencion Base="17000" Impuesto="001" TipoFactor="Tasa" TasaOCuota="0.300000" Importe="1870" />
                </cfdi:Retenciones>
            </cfdi:Impuestos>
            <cfdi:Parte ClaveProdServ="25201513" NoIdentificacion="055155" Cantidad="1.0" Descripcion="PARTE EJEMPLO" Unidad="UNIDAD" ValorUnitario="1.00" Importe="1.00">
                <cfdi:InformacionAduanera NumeroPedimento="15  48  4567  6001235" />
            </cfdi:Parte>
        </cfdi:Concepto>
        <cfdi:Concepto ClaveProdServ="01010101" ClaveUnidad="Q24" NoIdentificacion="6201" Cantidad="1.00"
    Unidad="PIEZA" Descripcion="SOME MERCHANDISE" ValorUnitario="33.00" Importe="33.00">
            <cfdi:Impuestos>
                <cfdi:Traslados>
                    <cfdi:Traslado Base="33.00" Impuesto="002" TipoFactor="Exento"/>
                </cfdi:Traslados>
            </cfdi:Impuestos>
            <cfdi:CuentaPredial Numero="51888"/>
        </cfdi:Concepto>
    <cfdi:Concepto ClaveProdServ="54101500" ClaveUnidad="APZ" Cantidad="10" Descripcion="Lapiz Berol del No. 2" ValorUnitario="123.45" Importe="1234.50">
      <cfdi:ComplementoConcepto>
      <iedu:instEducativas xmlns:iedu="http://www.sat.gob.mx/iedu" xsi:schemaLocation="http://www.sat.gob.mx/iedu http://www.sat.gob.mx/sitio_internet/cfd/iedu/iedu.xsd"
      version="1.0" nombreAlumno="Juanito Pérez Niño" CURP="JUAN010101MAZBCÑ90" nivelEducativo="Preescolar" autRVOE="1234" rfcPago="ABC010101AAA" />
      </cfdi:ComplementoConcepto>
    </cfdi:Concepto>
    </cfdi:Conceptos>
    <cfdi:Impuestos TotalImpuestosRetenidos="247500" TotalImpuestosTrasladados="360000">
        <cfdi:Retenciones>
            <cfdi:Retencion Impuesto="001" Importe="247000"/>
            <cfdi:Retencion Impuesto="003" Importe="500"/>
        </cfdi:Retenciones>
        <cfdi:Traslados>
            <cfdi:Traslado Impuesto="002" TipoFactor="Tasa" TasaOCuota="1.600000" Importe="360000"/>
        </cfdi:Traslados>
    </cfdi:Impuestos>
</cfdi:Comprobante>
`

module.exports = xmlExample
