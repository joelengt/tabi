var express = require('express');
var route = express.Router();

var handleSayHello = require('../../utils/sendEmail/index.js')

var config = require('../../../../config/index.js');

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

    // template content

    var template_content = {
        title: 'Tabi: Nuevo usuario quiere contactarte',
        receptores: [config.auth.mailing.receptor],
        template: `<table width="100%">
                                        <tr>
                                           <td>
                                                <div>
                                                    <p>nombre: ${datos_form.nombre}</p>
                                                </div>
                                                <div>
                                                    <p>email: ${datos_form.email}</p>
                                                </div>
                                                <div>
                                                    <p>mensaje: ${datos_form.message}</p>
                                                </div> 
                                           </td>
                                        </tr>
                                    </table>`
    };

    // enviar a un email
    handleSayHello(template_content, function (err, result) {
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
