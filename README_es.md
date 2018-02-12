##  README
<hr>
versión 1.0

**cdfi2pdf** genera un PDF a partir de un XML con CFDI version 3.3 para facturas electrónics de Mexico de acuerdo a los requerimientos del SAT. El PDF generado es una representación del contenido del XML.

### Antecedentes

La facturación Electrónica en México usa el formato de archivos XML, en dicho archivo se almacena la información de las transacciones electrónicas de facturas. Los XML son tipicamente enviados por correo electrónico y pueden ser bajados desde el portal del SAT. Esta herramienta fue desarrollada para generar los documentos en version PDF que corresponden a la información de las transacciones almacenadas en el archivo XML. Esta versión cubre el formato definido por la version de CFDI 3.3 en uso a partir de enero del 2018. Se presenta aqui, en la espera de que pueda ser de utilidad a muchos usuarios y desarrolladores. Las contribuciones y mejoras son bienvenidas, envianos tus comentarios a <info @ quad-tree.com>

La imagen de ejemplo con el logotipo es un string de base64 de un archivo de imagen PNG, el cual deberá ser reemplazado por el archivo del logotipo del emisor de las facturas o bien dejarlo en blanco.


### Procedimiento de Instalación

1.- Crea el directorio del proyecto de ejemplo:
~~~
$ mkdir cfditest
$ cd cfditest
~~~


2.- Instala desde NPM
~~~
$ npm install cfdi2pdf
~~~


### Creando un PDF desde el lado del cliente

Se requiere el paso de la cadena XML al método que genera el PDF
~~~
var cfdi2pdf = require("cfdi2pdf")
cfdi2pdf.createPDFClient(xml)
~~~


### Creando el PDF desde un servidor web

Paa generar el PDF como un módulo de servidor, se requiere tener los archivos de fuentes en su directorio publico. (Requerimiento de PDFMake).

Se pasa el XML como parámetro y la respuesta a donde será enviado el PDF, asi como las fuentes (fonts) para el PDF.

El logotipo del emisor debe estar codificado en base64.

Aqui un ejemplo de uso con express:

*Crea el archivo: cfdi2pdf_test.js*
~~~
var express = require('express');
var app = express();
var cfdi2pdf = require("cfdi2pdf")

var fonts = {
	Roboto: {
		normal: './fonts/Roboto-Regular.ttf',
		bold: './fonts/Roboto-Medium.ttf',
		italics: './fonts/Roboto-Italic.ttf',
		bolditalics: './fonts/Roboto-MediumItalic.ttf'
	}
};

var xml = "" //EXAMPLE

app.get('/', function (req, res) {
  cfdi2pdf.createPDFServer(xml,res, {fonts:fonts})
});

app.listen(3000, function () {
  console.log('cfdi2pdf app listening on port 3000');
});
~~~

En la terminal ejecuta:
~~~
$ node cfdi2pdf_test.js
~~~


Abre el explorador en http://localhost:3000
y listo!, ya tienes la version en PDF de una factura electrónica

<hr>

## License

Copyright 2018 Quad Tree

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el "Software"), para utilizar el Software sin restricción, incluyendo sin limitación los derechos a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o vender copias del Software, y a permitir a las personas a las que se les proporcione el Software a hacer lo mismo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIALIZACIÓN, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, QUE SURJA DE O EN CONEXIÓN CON EL SOFTWARE O EL USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.


## Made with love at Quad Tree / SLP / Mexico
by: Manuel Garcia, Carlos Alvarez, Enrique Motilla
visit our project at:  https://erpcloud.mx

feb, 2018
