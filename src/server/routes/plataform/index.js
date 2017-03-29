var express = require('express');
var route = express.Router();

var Purchases = require('../../models/purchares/index.js');

var elements = [
        {
            title: 'INTERNATIONAL',
            pack: [
                {
                    days: 5,
                    tarifa: '25.00'
                },
                {
                    days: 8,
                    tarifa: '28.00'
                },
                {
                    days: 10,
                    tarifa: '30.00'
                },
                {
                    days: 15,
                    tarifa: '35.00'
                },
                {
                    days: 22,
                    tarifa: '45.00'
                },
                {
                    days: 30,
                    tarifa: '55.00'
                },
                {
                    days: 45,
                    tarifa: '90.00'
                },
                {
                    days: 60,
                    tarifa: '105.00'
                },
                {
                    days: 90,
                    tarifa: '120.00'
                }
            ],
            countries: ['Norte America','Sur America','America Central','Caribe','Oceania','Asia','Africa']
        },
        {
            title: 'CLASSIC',
            pack: [
                {
                    days: 5,
                    tarifa: '15.00'
                },
                {
                    days: 8,
                    tarifa: '25.00'
                },
                {
                    days: 15,
                    tarifa: '30.00'
                },
                {
                    days: 20,
                    tarifa: '40.00'
                },
                {
                    days: 25,
                    tarifa: '45.00'
                },
                {
                    days: 30,
                    tarifa: '50.00'
                }
            ],
            countries: ['Sur America','America Central','Caribe']
        },
        {
            title: 'EUROPA',
            pack: [
                {
                    days: 5,
                    tarifa: '32.00'
                },
                {
                    days: 8,
                    tarifa: '40.00'
                },
                {
                    days: 10,
                    tarifa: '49.00'
                },
                {
                    days: 15,
                    tarifa: '66.00'
                },
                {
                    days: 22,
                    tarifa: '73.00'
                },
                {
                    days: 30,
                    tarifa: '80.00'
                },
                {
                    days: 45,
                    tarifa: '115.00'
                },
                {
                    days: 60,
                    tarifa: '125.00'
                },
                {
                    days: 90,
                    tarifa: '135.00'
                }
            ],
            countries: ['Europa','Oceania','Asia','Africa']
        },
        {
            title: 'STUDENT',
            pack: [
                {
                    days: 120,
                    tarifa: '149.00'
                },
                {
                    days: 150,
                    tarifa: '169.00'
                },
                {
                    days: 180,
                    tarifa: '179.00'
                },
                {
                    days: 210,
                    tarifa: '239.00'
                },
                {
                    days: 240,
                    tarifa: '259.00'
                },
                {
                    days: 270,
                    tarifa: '319.00'
                },
                {
                    days: 300,
                    tarifa: '349.00'
                },
                {
                    days: 330,
                    tarifa: '399.00'
                },
                {
                    days: 365,
                    tarifa: '419.00'
                }
            ],
            countries: ['todos']
        }
    ];

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
            // filtrar Por campos de preferencia

            var elements_filter = elements

            // devolver los campos guardados
            res.render('./plataforma/pricing/index.jade', {
                code: code,
                purchase: user.cotizator,
                packs: elements_filter
            });
        }
    })
    
});

// Update after user select a item to buy
route.post('/:code/purchare/buy-form', function (req, res) {
    var code = req.params.code;
    var pack_selected = req.body.pack_title;

    // buscar al usuario en la db, por el id
    Purchases.findOne({'_id': code}, (err, user) => {
        if(err) {
            return res.status(400).json({
                status: 'bat_request',
                message: 'error code not valid'
            })
        }

        if(user !== null) {
            // Actualizar usuario en su estatus de compra, y el producto que eligio

            res.status(200).json({
                status: 'ok',
                code: code,
                pack_selected: pack_selected
            })
        }
    })
    
});

// Render view - finally form to buy
route.get('/:code/purchare-form', function (req, res) {
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
            // Actualizar usuario en su estatus de compra, y el producto que eligio
            
            // devolver los campos guardados
            res.render('./plataforma/form_To_pay/index.jade', {
                code: code,
                pack: elements[0]
            });
        }
    })
    
});

module.exports = route;
