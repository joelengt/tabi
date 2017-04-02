var express = require('express');
var route = express.Router();

var Purchases = require('../../models/purchares/index.js');
var config = require('../../../../config/index.js')
var permiso = config.variables.typeUser

var generatePDF = require('../../utils/generatePDF/index.js')

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
            countries: ['Norte America','Sur America','America Central','Caribe','Oceania','Asia','Africa'],
            card: {
                'left': {
                    'Asistencia médica en caso de accidente': 'USD 15.000',
                    'Asistencia médica en caso de enfermedad': 'USD 15.000',
                    'Asistencia médica en caso pre-existencia': 'USD 300',
                    'Medicamentos ambulatorios': 'USD 500',
                    'Garantía por gastos de cancelación (*)': 'USD 600',
                    'Días complementarios de internación': '5 días',
                    'Hospitalizacion': 'SI',
                    'Asistencia en caso de extravío de documentos': 'SI',
                    'Gastos de hotel familiar acompañante': 'USD 500',
                    'Gastos de hotel por convalecencia': 'USD 500',
                    'Embarazo (hasta semana 24)': 'SI',
                    'Viaje de regreso por enfermedad.': 'SI'
                },
                'right': {
                    'Repatriación de restos.': 'SI',
                    'Traslado y repatriación sanitaria.': 'SI',
                    'Odontología de urgencia': 'USD 300',
                    'Compensación por pérdida de equipaje': 'USD 300 (complementario)',
                    'Traslado de un familiar en caso de internación': 'SI',
                    'Asistencia legal en caso de accidente de tránsito': 'USD 2.000',
                    'Adelanto de fianzas': 'USD 2.000',
                    'Transferencia de fondos': 'USD 2.000',
                    'Transmisión de mensajes urgentes.': 'SI',
                    'Línea de consulta 24 hs.': 'SI',
                    'Límite de edad (**)': '85 años'
                }
            },
            conditions: '(*) para aplicar los gastos de cancelacion de viaje se aplica un deducible 25% (**) y para los pasajeros de 75 a 85 años se incrementa la tarifa en un 50% mas. Para mayor informacion consultar las condiciones generales.'
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
            countries: ['Sur America','America Central','Caribe'],
            card: {
                'left': {
                    'Asistencia médica en caso de accidente': 'USD 6.000',
                    'Asistencia médica en caso de enfermedad': 'USD 6.000',
                    'Asistencia médica en caso pre-existencia': 'USD 300',
                    'Medicamentos ambulatorios': 'USD 300',
                    'Días complementarios de internación': '5 días',
                    'Hospitalizacion': 'SI',
                    'Asistencia en caso de extravío de documentos': 'SI',
                    'Gastos de hotel por convalecencia': 'USD 300',
                    'Gastos de hotel familiar acompañante': 'USD 300',
                    'Repatriación de restos.': 'SI',
                    'Traslado y repatriación sanitaria.': 'SI'
                },
                'right': {
                    'Odontología de urgencia': 'USD 200',
                    'Compensación por pérdida de equipaje': 'USD 200 (complementario)',
                    'Viaje de regreso por enfermedad.': 'SI',
                    'Traslado de un familiar en caso de internación': 'SI',
                    'Asistencia legal en caso de accidente de tránsito': 'USD 2.000',
                    'Adelanto de fianzas': 'USD 2.000',
                    'Transferencia de fondos': 'USD 2.000',
                    'Transmisión de mensajes urgentes.': 'SI',
                    'Línea de consulta 24 hs.': 'SI',
                    'Cobertura en cruceros': 'NO',
                    'Límite de edad (**)': '85 años'
                }
            },
            conditions: 'Para mayor informacion consultar las condiciones generales.'
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
            countries: ['Europa','Oceania','Asia','Africa'],
            card: {
                'left': {
                    'Asistencia médica en caso de accidente': '30000',
                    'Asistencia médica en caso de enfermedad': '30000',
                    'Asistencia médica en caso pre-existencia': '300',
                    'Medicamentos ambulatorios': '500',
                    'Garantía por gastos de cancelación (*)': '1000',
                    'Días complementarios de internación': '5 días',
                    'Hospitalizacion': 'SI',
                    'Asistencia en caso de extravío de documentos': 'SI',
                    'Gastos de hotel familiar acompañante': '500',
                    'Gastos de hotel por convalecencia': '500',
                    'Embarazo (hasta semana 24)': 'SI'
                },
                'right': {
                    'Viaje de regreso por enfermedad.': 'SI',
                    'Repatriación de restos.': 'SI',
                    'Traslado y repatriación sanitaria.': 'SI',
                    'Odontología de urgencia': '300',
                    'Compensación por pérdida de equipaje': '€ 500 (complementario)',
                    'Traslado de un familiar en caso de internación': 'SI',
                    'Asistencia legal en caso de accidente de tránsito': '2000',
                    'Adelanto de fianzas': '2000',
                    'Transferencia de fondos': '2000',
                    'Transmisión de mensajes urgentes.': 'SI',
                    'Línea de consulta 24 hs.': 'SI',
                    'Límite de edad (**)': '85 años'
                }
            },
            'conditions': '(*) para aplicar los gastos de cancelacion de viaje se aplica un deducible 25% (**) y para los pasajeros de 75 a 85 años se incrementa la tarifa en un 50% mas. Para mayor informacion consultar las condiciones generales.'
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
            countries: ['todos'],
            card: {
                'left': {
                    'Asistencia médica en caso de accidente': 'USD 50.000',
                    'Asistencia médica en caso de enfermedad': 'USD 50.000',
                    'Asistencia médica en caso pre-existencia': 'USD 300',
                    'Medicamentos ambulatorios': 'USD 1.000',
                    'Días complementarios de internación': '5 días',
                    'Hospitalizacion': 'SI',
                    'Asistencia en caso de extravío de documentos': 'SI',
                    'Gastos de hotel familiar acompañante': 'USD 500',
                    'Gastos de hotel por convalecencia': 'USD 300',
                    'Embarazo (hasta semana 24)': 'SI',
                    'Viaje de regreso por enfermedad.': 'SI'
                },
                'right': {
                    'Repatriación de restos.': 'SI',
                    'Traslado y repatriación sanitaria.': 'SI',
                    'Odontología': 'USD 350',
                    'Compensación por pérdida de equipaje': 'USD 500 (complementario)',
                    'Traslado de un familiar en caso de internación': 'SI',
                    'Asistencia legal en caso de accidente de tránsito': 'USD 1.000',
                    'Adelanto de fianzas': 'USD 2500',
                    'Transferencia de fondos': 'USD 2.000',
                    'Transmisión de mensajes urgentes.': 'SI',
                    'Línea de consulta 24 hs.': 'SI',
                    'Límite de edad': '50 años'
                }
            },
            'conditions': 'Para mayor informacion consultar las condiciones generales.'
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

route.get('/get-user/:code', function (req, res) {
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

            // devolver los campos guardados
            res.status(200).json({
                code: code,
                user: user.account
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
            res.render('./plataforma/form_to_pay/index.jade', {
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
            nombres:      req.body.user.nombres   || 'joel',
            apellidos:    req.body.user.apellidos || 'gonzales',
            tipo_doc:     req.body.user.tipo_doc  || '64433402',
            doc_number:   req.body.user.doc_number || 'DNI',
            fecha_nacimiento: req.body.user.fecha_nacimiento || '02/21/90',
            email:      req.body.user.email || 'someone@gmail.com', 
            domicilio:  req.body.user.domicilio || 'av lima',
        },
        contact_emergencia: {
            nombres:   req.body.contact_emergencia.nombres || 'juan',
            apellidos: req.body.contact_emergencia.apellidos || 'gomez',
            telefono:  req.body.contact_emergencia.telefono || '999999999',
            email:     req.body.contact_emergencia.email || 'home@gmail.com'
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

// forget pdf access
route.post('/forget-pdf-access', function (req, res) {
    var dni = req.body.dni;

    console.log('Forget PDF');
    console.log(dni);

    // validando existencia del usuario

    Purchases.findOne({'account.doc_number': dni}, (err, user) => {
        if(err) {
            return res.status(400).json({
                status: 'bat_request',
                message: 'error code not valid'
            })
        }
        console.log('user');
        console.log(user);

        if(user !== null) {
            res.status(200).json({
                status: 'ok',
                dni: dni,
                code: user._id
            })
        } else {
            res.status(404).json({
                status: 'not_found'
            })
        }
    })

})

// Render view - pdf
route.get('/:code/key-pdf', function (req, res) {
    var code = req.params.code;
    
    var venta = {
        'numero_pedido': req.query.numero_pedido,
        'ticket': req.query.ticket
    }

    console.log('DATOS DEL QUERY');
    console.log(venta);

    console.log('Antes de generar el pdf');

    // buscar al usuario en la db, por el id
    Purchases.findOne({'_id': code}, (err, user) => {
        if(err) {
            return res.status(400).json({
                status: 'bat_request',
                message: 'error code not valid'
            })
        }

        console.log('resultado del usuario');
        console.log(user);

        if(user !== null) {
            
            // Filtrando detalles del paquete
            var pack_details = elements.filter((element) => {
                return element.title === user.pack_selected.title;
            })

            var value_to_download = '';

            if(user.access === permiso.premium) {

                console.log('a punto de generar pdf');

                generatePDF(user, pack_details[0], venta, (err, result) => {
                    if(err) {
                        console.log('salto error');
                        return console.log('error', err);
                    }
                    console.log('PDF final terminado');
                    console.log(result);

                    value_to_download = `/news/${ code }.pdf`;

                    res.render('./plataforma/pdf/index.jade', {
                        status: 'Descargar',
                        code: code,
                        pack: user.pack_selected,
                        pdf: value_to_download
                    });

                });

            } else {

                value_to_download = 'not_access';

                console.log('DATOS ACTUAL DEL USUARIO - pdf');
                console.log(user);

                // devolver los campos guardados
                res.render('./plataforma/pdf/index.jade', {
                    status: 'No tienes permiso',
                    code: code,
                    pack: user.pack_selected,
                    pdf: value_to_download
                });

            }

        }
    })
    
});

// Render view - forgot pdf
route.get('/get/forget-pdf', function (req, res) {
    res.render('./plataforma/pdf/forget_pdf/index.jade', {
        status: 'ok'
    });
});

module.exports = route;
