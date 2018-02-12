# README #

cdfi2pdf creates a pdf based on an XML CFDI. It uses pdfmake and xml2js as dependencies.

### How  to use ###

1.- Clone the repository:

    $ git clone https://"my-username"@bitbucket.org/quadtree/cfdi2pdf

2.- Go to the proyect folder:

    $ cd cfdi2pdf

3.- Install dependencies:

    $ npm install

4.- Copy the proyect to your application node_modules folder

### Creating a PDF client side ###

You need to pass an XML string to the method in order to get the PDF document.

    var cfdi2pdf = require("cfdi2pdf")
    cfdi2pdf.createPDFClient(xml)

### Creating a PDF server side ###

In order to use the module server side, you need to have the fonts to be used in your public folder.
You need to pass an XML string, the response (where the pdf will be sent), and the fonts as options in order to get the PDF document.
You can also send a base64 image as part of the options in order to be used as the logo of the company.
Here is an example using express:

    var cfdi2pdf = require("cfdi2pdf")
    var fonts = {
	    Roboto: {
		    normal: './fonts/Roboto-Regular.ttf',
		    bold: './fonts/Roboto-Medium.ttf',
		    italics: './fonts/Roboto-Italic.ttf',
		    bolditalics: './fonts/Roboto-MediumItalic.ttf'
	    }
    };
    var options = {
      fonts:fonts,
      image:"base64" //the image is optional
    };
    app.get('/', function (req, res) {
        cfdi2pdf.createPDFServer(xml,res,options)
    });
