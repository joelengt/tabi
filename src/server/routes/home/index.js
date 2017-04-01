var express = require('express');
var route = express.Router();

var handleSayHello = require('../../utils/sendEmail/index.js')

route.get('/', function (req, res) {
    
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
