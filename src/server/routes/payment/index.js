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
    normal: 'normal',
    premium: 'premium'
}

//  Function upgrade user method put API
function Upgrade(user_id, type_service, result, cb) {
    // Upgrade en Users access to textos
    var data_user = {
        access: type_service
    }

    // Update con la data de acceso de nuevo usuario
    Users.update({'_id': user_id}, data_user, function (err, success) {
        if(err) {
            return cb(err)

        } else {

            Users.findById({'_id': user_id}, function (err, user) {
                if(err) {
                    return cb(err)
                }

                if(user !== null) {

                    user.account.numero_pedido = result.metadata['Numero Orden']
                    user.account.ticket = result.id

                    user.save((err, user_saved) => {
                        if(err) {
                            return res.status(200).json({
                                status: 'Error al guardar estado de venta',
                                message: 'La venta no se pudo guardar en la base de datos'
                            })
                        }

                        cb(err, user_saved)

                    })

                } else {

                    cb(err)

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


    Users.findById({'_id': user_id}, (err, user) => {
        if(err) {
            return res.status(404).json({
                status: 'Error',
                error: err
            })
        }

        // Convierto el monto al valor correcto: 
        var amount = Number(user.pack_selected.tarifa);
        amount = +(amount.toFixed(2).replace('.', ''));

        console.log('DATOS DEL USUARIO');
        console.log(user);

        var obj = {
          "amount": amount,
          "currency_code": "USD",
          "capture": true,
          "email": user.account.email,
          "description": user.pack_selected.title,
          "address": user.account.address,
          "address_city": user.account.ciudad,
          "first_name": user.account.names,
          "last_name": user.account.last_names,
          "phone_number": user.account.phone,
          "source_id": token,
          "metadata": { 
            "Numero Orden": String('NRAS000' + Date.now()),
            "dni": user.account.doc_number,
            "first_name": user.account.names,
            "last_name": user.account.last_names,
            "phone_number": user.account.phone,
            "description": user.pack_selected.title,
            "address": user.account.address,
            "address_city": user.account.ciudad
           }
        }

        request({
            url: baseUrl + '/charges',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + config.auth.culqi.private_key
            },
            json: true,
            body: obj
        }, function (err, response, result) {
            if (err) callback (err);
            else {
                console.log(result);
                
                console.log(response.statusCode);

                if(response.statusCode === 201) {

                    // Upgrade user to premium access have other service
                    Upgrade(user_id, permiso.premium, result, function (err, usuario_access) {
                        if(err) {
                            return console.log('Error al actualizar usuario: ' + err)
                        }

                        console.log('DATOS DEL USUARIO <---');
                        console.log(usuario_access);

                        // success
                        res.status(200).json({
                          status: 'Success',
                          responseCode: 200,
                          message: 'Charge Success',
                          user_id: usuario_access._id,
                          data: {
                            numero_pedido:  usuario_access.account.numero_pedido,
                            charge_id: usuario_access.account.ticket
                          }
                        })

                    })

                } else {

                    console.log('RESPUESTA DE CULQI');
                    console.log(result);

                    user.account.numero_pedido = obj.metadata['Numero Orden']
                    user.account.ticket = result.charge_id

                    user.save((err, user_saved) => {
                        if(err) {
                            return res.status(200).json({
                                status: 'Error al guardar estado de venta',
                                message: 'La venta no se pudo guardar en la base de datos'
                            })
                        }   

                        console.log('DATOS DEL USUARIO <---');
                        console.log(user_saved);

                        // error value
                        res.status(200).json({
                          status: result.type,
                          responseCode: response.statusCode,
                          message: result.user_message,
                          user_id: user_saved._id,
                          data: {
                            numero_pedido:  user_saved.account.numero_pedido,
                            charge_id: user_saved.account.ticket
                          }
                        })

                    })
                    
                }

            }
        });

    })

})

module.exports = app
