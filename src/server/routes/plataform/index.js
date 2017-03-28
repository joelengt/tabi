var express = require('express');
var route = express.Router();

var Purchases = require('../../models/purchares/index.js');

route.post('/validate', function (req, res) {

    var data = req.body;

    console.log(data);

    if(data !== null) {
        console.log('hay datos');

        // guardar los campos en la db
        var purchare = new Purchases({
            cotizator: {
                origen:        data.origen,
                destino:       data.destino,
                tipo_viaje:    data.tipo_viaje,
                salida:        data.salida,
                regreso:       data.regreso,
                dias:          data.dias,
                pasajero:      data.pasajero,
                adulto_mayor:  data.adulto_mayor,
                promocion:     data.promocion,
                email:         data.email
            }
        });

        purchare.save((err, saved) => {
            if(err) {
                return console.log(err);
            }

            // retornar el id de creacion
            return res.status(200).json({
                status: 'ok',
                code: saved._id
            });

        })

    } else {
        console.log('NO hay datos');
        return res.status(400).json({
            status: 'bad_request'
        });
    }


});

route.get('/:code', function (req, res) {
    var code = req.params.code;

    // buscar al usuario en la db, por el id
    Purchases.findOne({'_id': code}, (err, user) => {
        if(err) {
            return res.status(400).json({
                status: 'bat_request',
                message: 'error code not valid'
            })
        }

        if(user !== null) {
            // devolder los campos guardados
            res.render('./plataforma/pricing/index.jade', {
                purchase: user.cotizator
            });
        }
    })
    
});

module.exports = route;
