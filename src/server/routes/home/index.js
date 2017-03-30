var express = require('express');
var route = express.Router();

var handleSayHello = require('../../utils/sendEmail/index.js')
var generatePDF = require('../../utils/generatePDF/index.js')

const fs = require('fs');
const htmlTo = require('html2xlsx');

route.get('/', function (req, res) {

    var id_user = '312312312';

    // generatePDF(id_user, (err, result) => {
    //     if(err) {
    //         return console.log('error', err);
    //     }
    //     console.log('PDF final terminado');
    //     console.log(result);


    // });

    // htmlTo(`
    //   <style type="text/css">
    //     table td {
    //       color: #666;
    //       height: 20px;
    //       background-color: #f1f1f1;
    //       border: 1px solid #eee;
    //     }
    //   </style>
    //   <table>
    //     <tr>
    //       <td>foo</td>
    //       <td>bar</td>
    //     </tr>
    //     <tr>
    //       <td>hello</td>
    //       <td>world</td>
    //     </tr>
    //     <tr>
    //       <td type="number">123</td>
    //       <td type="number">123.456</td>
    //     </tr>
    //     <tr>
    //       <td data-type="bool">true</td>
    //       <td data-type="bool">false</td>
    //     </tr>
    //     <tr>
    //       <td data-type="bool">1</td>
    //       <td data-type="bool">0</td>
    //     </tr>
    //     <tr>
    //       <td type="formula">SUM(A1:B1)</td>
    //       <td type="formula">A1-B1</td>
    //     </tr>
    //     <tr>
    //       <td type="date">2013-01-12T12:34:56+08:00</td>
    //       <td type="datetime">2013-01-12T12:34:56+08:00</td>
    //     </tr>
    //   </table>
    // `, (err, file) => {
    //   if (err) return console.error(err);
      
    //   file.saveAs()
    //     .pipe(fs.createWriteStream('test.xlsx'))
    //     .on('finish', () => console.log('Done.'));
    // });

    // res.status(200).json({
    //     status: 'ok',
    //     message: 'value'
    // })

    res.render('./home/index.jade');

});

// form to contact
route.post('/contact', function (req, res) {

    var datos_form = {
        nombre:   req.body.name,
        email:    req.body.email,
        message:  req.body.message
    }

    // Guardar en la db
    console.log('to send email');
    console.log(datos_form);


    // enviar a un email
    handleSayHello(datos_form, function (err, result) {
        if(err) {
            return res.status(500).json({
                status: 'error_server',
                error: err,
                message: 'Error al enviar email. Intente más tarde. Si el problema continua, contactar con soporte'
            })
        }

        console.log('RESULTADO DEL ENVIO EMAIL')
        console.log(result)
        
        res.status(200).json({
            status: 'ok',
            message: '!Gracias¡. En la brevedad te contactaremos'
        })

    })


});

module.exports = route;
