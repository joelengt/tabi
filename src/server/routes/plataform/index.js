var express = require('express');
var route = express.Router();

var Purchases = require('../../models/purchares/index.js');

var elements = [
        {
            title: 'INTERNATIONAL',
            pack: [
                {
                    days: '5',
                    tarifa: '25.00'
                },
                {
                    days: '8',
                    tarifa: '28.00'
                },
                {
                    days: '10',
                    tarifa: '30.00'
                },
                {
                    days: '15',
                    tarifa: '35.00'
                },
                {
                    days: '22',
                    tarifa: '45.00'
                },
                {
                    days: '30',
                    tarifa: '55.00'
                },
                {
                    days: '45',
                    tarifa: '90.00'
                },
                {
                    days: '60',
                    tarifa: '105.00'
                },
                {
                    days: '90',
                    tarifa: '120.00'
                }
            ],
            countries: ['Norte America','Sur America','America Central','Caribe','Oceania','Asia','Africa']
        },
        {
            title: 'CLASSIC',
            pack: [
                {
                    days: '5',
                    tarifa: '15.00'
                },
                {
                    days: '8',
                    tarifa: '25.00'
                },
                {
                    days: '15',
                    tarifa: '30.00'
                },
                {
                    days: '20',
                    tarifa: '40.00'
                },
                {
                    days: '25',
                    tarifa: '45.00'
                },
                {
                    days: '30',
                    tarifa: '50.00'
                }
            ],
            countries: ['Sur America','America Central','Caribe']
        },
        {
            title: 'EUROPA',
            pack: [
                {
                    days: '5',
                    tarifa: '32.00'
                },
                {
                    days: '8',
                    tarifa: '40.00'
                },
                {
                    days: '10',
                    tarifa: '49.00'
                },
                {
                    days: '15',
                    tarifa: '66.00'
                },
                {
                    days: '22',
                    tarifa: '73.00'
                },
                {
                    days: '30',
                    tarifa: '80.00'
                },
                {
                    days: '45',
                    tarifa: '115.00'
                },
                {
                    days: '60',
                    tarifa: '125.00'
                },
                {
                    days: '90',
                    tarifa: '135.00'
                }
            ],
            countries: ['Europa','Oceania','Asia','Africa']
        },
        {
            title: 'STUDENT',
            pack: [
                {
                    days: '120',
                    tarifa: '149.00'
                },
                {
                    days: '150',
                    tarifa: '169.00'
                },
                {
                    days: '180',
                    tarifa: '179.00'
                },
                {
                    days: '210',
                    tarifa: '239.00'
                },
                {
                    days: '240',
                    tarifa: '259.00'
                },
                {
                    days: '270',
                    tarifa: '319.00'
                },
                {
                    days: '300',
                    tarifa: '349.00'
                },
                {
                    days: '330',
                    tarifa: '399.00'
                },
                {
                    days: '365',
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

            // filtro por destino
            var filter_by_country = [];

            for(var y = 0; y <= elements.length - 1; y++) {
                var element_pack = elements[y].countries;

                for(var u = 0; u <= element_pack.length - 1; u++) {
                    var element_pack_countri = element_pack[u];

                    if(element_pack_countri === user.cotizator.destino) {

                        filter_by_country.push(elements[y]);
                        break;
                    }
                }
            }

            
            console.log('Packs filtrados');
            console.log(filter_by_country);

            // filtrando paquete por dias
            var result_filter_tarifa = [];

            for (var m = 0; m <= filter_by_country.length - 1; m++) {
                var result_filter_element = filter_by_country[m];

                for (var a = 0; a <= result_filter_element.pack.length - 1 ; a++) {
                    var element = result_filter_element.pack[a];

                    var days_value = Number(user.cotizator.dias);

                    if(days_value > Number(result_filter_element.pack[result_filter_element.pack.length - 1].days)) {
                        days_value = Number(result_filter_element.pack[result_filter_element.pack.length - 1].days);
                    }

                    if(Number(element.days) >= days_value) {

                        result_filter_tarifa.push(element);
                        break;

                    }
                }

            }

            var elements_filter = [];

            for(var r = 0; r <= filter_by_country.length - 1; r++) {
                elements_filter.push({
                    title: filter_by_country[r].title,
                    pack: result_filter_tarifa[r]
                });
            }

            console.log('TENTACLE <<<<');
            console.log(elements_filter);

            console.log('TENTACLE DAYS')
            console.log(result_filter_tarifa);

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
            user.pack_selected.title = pack_selected;

            // filtrando paquete por dias
            var result_filter_element = elements.filter((element) => {
                return element.title === pack_selected;
            })

            var result_filter_tarifa = [];

            for (var i = 0; i <= result_filter_element[0].pack.length -1 ; i++) {
                var element = result_filter_element[0].pack[i];

                var days_value = Number(user.cotizator.dias);

                if(days_value > Number(result_filter_element[0].pack[result_filter_element[0].pack.length - 1].days)) {
                    days_value = Number(result_filter_element[0].pack[result_filter_element[0].pack.length - 1].days);
                }

                if(Number(element.days) >= days_value) {

                    result_filter_tarifa.push(element);
                    break;

                }
            }

            // Obteniendo tarifa
            user.pack_selected.dias = result_filter_tarifa[0].days;
            user.pack_selected.tarifa = result_filter_tarifa[0].tarifa;


            console.log('datos del filtro');
            console.log(result_filter_tarifa);

            // Guardando datos
            user.save((err, saved) => {
                if(err) {
                    return console.log(err);
                }

                res.status(200).json({
                    status: 'ok',
                    code: code
                })

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
            
            console.log('DATOS ACTUAL DEL USUARIO');
            console.log(user);

            // devolver los campos guardados
            res.render('./plataforma/form_To_pay/index.jade', {
                code: code,
                pack: user.pack_selected
            });
        }
    })
    
});

// Save form to buy pack selected
route.post('/:code/purchare-buy/save', function (req, res) {
    var code = req.params.code;

    var data_form = {
        user: {
            nombres:      req.body.user.nombres,
            apellidos:    req.body.user.apellidos,
            tipo_doc:     req.body.user.tipo_doc,
            doc_number:   req.body.user.doc_number,
            fecha_nacimiento: req.body.user.fecha_nacimiento,
            email:      req.body.user.email, 
            domicilio:  req.body.user.domicilio,
        },
        contact_emergencia: {
            nombres:   req.body.contact_emergencia.nombres,
            apellidos: req.body.contact_emergencia.apellidos,
            telefono:  req.body.contact_emergencia.telefono,
            email:     req.body.contact_emergencia.email
        }
    }


    console.log('DATOS DE LA COMPRA');

    console.log(data_form);


    // buscar al usuario en la db, por el id
    Purchases.findOne({'_id': code}, (err, user) => {
        if(err) {
            return res.status(400).json({
                status: 'bat_request',
                message: 'error code not valid'
            })
        }

        if(user !== null) {
            
            // Guardar en la db
            user.account.names = data_form.user.nombres
            user.account.last_names =  data_form.user.apellidos
            user.account.tipo_doc =  data_form.user.tipo_doc
            user.account.doc_number =   data_form.user.doc_number
            user.account.fecha_nacimiento =   data_form.user.fecha_nacimiento
            user.account.email = data_form.user.email
            user.account.domicilio = data_form.user.domicilio
            user.account.full_name = `${ data_form.user.nombres } ${ data_form.user.apellidos }`

            // contact emergencia
            user.account.contact_emergencia.nombres = data_form.contact_emergencia.nombres
            user.account.contact_emergencia.apellidos = data_form.contact_emergencia.apellidos
            user.account.contact_emergencia.telefono = data_form.contact_emergencia.telefono
            user.account.contact_emergencia.email = data_form.contact_emergencia.email
            
            // save data

            user.save((err, saved) => {
                if(err) {
                    return console.log(err);
                }

                console.log('USUARIO UPDATED');
                console.log(saved);

                res.status(200).json({
                    status: 'ok',
                    code: saved._id
                })

            })

        }
    })
    
});


// Render view - pdf
route.get('/:code/key-pdf', function (req, res) {
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
            
            console.log('DATOS ACTUAL DEL USUARIO - pdf');
            console.log(user);

            // devolver los campos guardados
            res.render('./plataforma/pdf/index.jade', {
                code: code,
                pack: user.pack_selected
            });

        }
    })
    
});
module.exports = route;
