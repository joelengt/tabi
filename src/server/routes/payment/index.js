var express = require('express')
var app = express.Router()

var config = require('../../../../config/index.js')
var permiso = config.variables.typeUser

var request = require('request')
var crypto  = require('crypto')

var baseUrl = 'https://api.culqi.com/v2';

var Users = require('../../models/purchares')
var Culqi_sales = require('../../models/culqi_users')
var Culqi_user_paid = require('../../models/culqi_user_pay')

// Tipo de Servicio - Material de Acceso
var material = {
    textos: 'textos',
    audiolibros: 'audiolibros',
    simuladores: 'simuladores',
    premium: 'premium'
}

//  Function upgrade user method put API
function Upgrade(user_id, res, type_service, cb) {
    // Upgrade en Users access to textos
    var data_user = {
        access: type_service
    }

    // Update con la data de acceso de nuevo usuario
    Users.update({'_id': user_id}, data_user, function (err, success) {
        if(err) {
            return cb(err)
        }
        if(success) {

            Users.findById({'_id': user_id}, function (err, user) {
                if(err) {
                    return cb(err)
                }

                if(user) {
                    
                    var usuario_access = '' 
                    usuario_access = user.access

                    cb(err, usuario_access, function data(result) {
                        console.log('Ejecutando el renderde vista data')

                        return res.status(200).json({
                            user: user,
                            service_access: result.service_access,
                            process_messages: result.process_messages
                        })
                    
                    })

                }
                
            })
            
        }

    })

}

// API POST: crear venta , agregar a intencion de compra, agregar al carrito
app.post('/:user_id/:type_service', function (req, res) {
    var user_id = req.params.user_id
    var type_service = req.params.type_service
    var token = req.body.token;

    console.log('datos del usuario');
    console.log('token');
    console.log(token);

    console.log('user_id');
    console.log(user_id);

    console.log('tipo de servicio');
    console.log(type_service);

    // Convierto el monto al valor correcto: 
    // amount = Number(amount);
    // amount = +(amount.toFixed(2).replace('.', ''));

    var obj = {
      "amount": 4500,
      "currency_code": "USD",
      "capture": true,
      "email": "richard@piedpiper.com",
      "source_id": token,
      "description": 'poliza'

    }

    request({
        url: baseUrl + '/charges',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer sk_test_mCpkD0ccXRLLp87W' 
        },
        json: true,
        body: obj
    }, function (err, response, result) {
        if (err) callback (err);
        else {
            console.log(result);
            
            console.log(response.statusCode);

            res.status(200).json({
              status: 'terminado'
            })

            // body

        }
    });

})

// API update Access: UPGRADE - Textos 
app.put('/check/:user_id/:type_service', function (req, res) {

    var user_id = req.params.user_id
    var type_service = req.params.type_service

    console.log('Respuesta de culqi - sobre el pago, llego al server')
    
    // Obteniendo la data del usuario
    var culqi_answer_about_sale = { 
        resultado: req.body.respuesta
    }
    
    console.log('Repuesta de culqi - JSON')
    console.log(culqi_answer_about_sale.resultado)

    if(culqi_answer_about_sale.resultado === 'checkout_cerrado') {
        res.status(200).json({
            status: 'La caja de pago fue cerrada.',
            process_messages: 'check_not_pass',
            service_access: type_service
        })

    } else if (culqi_answer_about_sale.resultado === 'parametro_invalido') {
        res.status(200).json({
            status: 'Los parametros ingresados son invalidos, Ingrese los campos correctamente.',
            process_messages: 'check_not_pass',
            service_access: type_service
        })
    } else if (culqi_answer_about_sale.resultado === 'venta_expirada') {
        res.status(200).json({
            status: 'Tiempo limite concluido, Venta expirada.',
            process_messages: 'check_not_pass',
            service_access: type_service
        })
    } else if (culqi_answer_about_sale.resultado === 'error') {
        res.status(200).json({
            status: 'Error en el envio de datos de la caja.',
            process_messages: 'check_not_pass',
            service_access: type_service
        })
    } else {
        // Decodificar encryting about message culqi payment
        var sale_descifrado = JSON.parse(descifrar_now(culqi_answer_about_sale.resultado, config.auth.culqi.key_api_dev).toString('utf8'))

        console.log('Respuesta de culqi Descifrado!!!!!!!!!')
        console.log(sale_descifrado)

        // Creando nuevo usuario, con info de tarjeta
        var new_Culqi_user_paid = new Culqi_user_paid(sale_descifrado)
        
        // Almacenando nuevo usuario en proceso de pago - para hacer consultar por ticket de usuario y ver su proceso en culqi y en la base de datos
        new_Culqi_user_paid.save(function (err) {
            if(err) {
                console.log('Error en almacenar datos de proceso de venta del usuario en la DB : ' + err)
            }
        })

        // Validar la respuesta antes de enviar al cliente
        if(sale_descifrado.codigo_respuesta === 'venta_exitosa') {
            // Evento upgrade de usuario
            console.log(sale_descifrado.codigo_respuesta)

            Users.findById({"_id": user_id}, function (err, user) {
                if(err) {
                    return console.log(" Error al encontrar usuario: " + err)       
                }

                // Acceso de de undefinedsuario
                var user_access = user.access

                console.log('El servicio para subir es: ' + type_service)
                console.log('Data de user access ANTES DE ENTRAR : ' + user_access)

                // Validando tipo de servicio
                // Upgrade user to premium access have other service
                Upgrade(user_id, res, permiso.premium, function (err, usuario_access, data) {
                    if(err) {
                        return console.log('Error al actualizar usuario: ' + err)
                    }

                    console.log('Usuario Actualizado de: ' + user_access + ' a ' + usuario_access)
                    console.log('Ventanna de Felicidades: nuevo upgrade : ' + usuario_access)
                    
                    var result_upgrade = {
                        code: user_id,
                        service_access: 'Premium',
                        process_messages: {
                            numero_pedido: sale_descifrado.numero_pedido,
                            ticket: sale_descifrado.ticket,
                            mensaje_respuesta_usuario: sale_descifrado.mensaje_respuesta_usuario,
                            mensaje_respuesta: sale_descifrado.mensaje_respuesta,
                            codigo_respuesta: sale_descifrado.codigo_respuesta
                        }
                    }

                    data(result_upgrade)

                })
                    
            })

        } else if(sale_descifrado.codigo_respuesta === 'venta_expirada') {
            console.log(sale_descifrado.codigo_respuesta)

            Users.findById({"_id": user_id}, function (err, user) {
                if(err) {
                    return console.log(" Error al encontrar usuario: " + err)       
                }
            
                // Venta expirada
                res.status(200).json({
                    user: user,
                    service_access: type_service,
                    process_messages: {
                        numero_pedido: sale_descifrado.numero_pedido,
                        ticket: sale_descifrado.ticket,
                        mensaje_respuesta_usuario: sale_descifrado.mensaje_respuesta_usuario,
                        mensaje_respuesta: sale_descifrado.mensaje_respuesta,
                        codigo_respuesta: sale_descifrado.codigo_respuesta
                    }
                })
            })

        } else if(sale_descifrado.codigo_respuesta === 'error') {
            console.log(sale_descifrado.codigo_respuesta)
            
            Users.findById({"_id": user_id}, function (err, user) {
                if(err) {
                    return console.log(" Error al encontrar usuario: " + err)       
                }

                // error
                res.status(200).json({
                    user: user,
                    service_access: type_service,
                    process_messages: {
                        numero_pedido: sale_descifrado.numero_pedido,
                        ticket: sale_descifrado.ticket,
                        mensaje_respuesta_usuario: sale_descifrado.mensaje_respuesta_usuario,
                        mensaje_respuesta: sale_descifrado.mensaje_respuesta,
                        codigo_respuesta: sale_descifrado.codigo_respuesta
                    }
                })      
            })

        } else if(sale_descifrado.codigo_respuesta === 'parametro_invalido') {
            console.log(sale_descifrado.codigo_respuesta)
            
            Users.findById({"_id": user_id}, function (err, user) {
                if(err) {
                    return console.log(" Error al encontrar usuario: " + err)       
                }

                // parametro invalido
                res.status(200).json({
                    user: user,
                    service_access: type_service,
                    process_messages: {
                        numero_pedido: sale_descifrado.numero_pedido,
                        ticket: sale_descifrado.ticket,
                        mensaje_respuesta_usuario: sale_descifrado.mensaje_respuesta_usuario,
                        mensaje_respuesta: sale_descifrado.mensaje_respuesta,
                        codigo_respuesta: sale_descifrado.codigo_respuesta
                    }
                })
            })
            
        } else if(sale_descifrado.codigo_respuesta === 'error_procesamiento') {
            console.log(sale_descifrado.codigo_respuesta)
            
            Users.findById({"_id": user_id}, function (err, user) {
                if(err) {
                    return console.log(" Error al encontrar usuario: " + err)       
                }

                // parametro invalido
                res.status(200).json({
                    user: user,
                    service_access: type_service,
                    process_messages: {
                        numero_pedido: sale_descifrado.numero_pedido,
                        ticket: sale_descifrado.ticket,
                        mensaje_respuesta_usuario: sale_descifrado.mensaje_respuesta_usuario,
                        mensaje_respuesta: sale_descifrado.mensaje_respuesta,
                        codigo_respuesta: sale_descifrado.codigo_respuesta
                    }
                })
            })
            
        } else {
            Users.findById({"_id": user_id}, function (err, user) {
                if(err) {
                    return console.log(" Error al encontrar usuario: " + err)       
                }
                
                // No se recibio respuesta
                res.status(200).json({
                    user: user,
                    service_access: type_service,
                    process_messages: {
                        numero_pedido: sale_descifrado.numero_pedido,
                        ticket: sale_descifrado.ticket,
                        mensaje_respuesta_usuario: sale_descifrado.mensaje_respuesta_usuario,
                        mensaje_respuesta: sale_descifrado.mensaje_respuesta,
                        codigo_respuesta: sale_descifrado.codigo_respuesta
                    }
                })
            })
        }
    }
        
})

module.exports = app
