var express = require('express');
var route = express.Router();

var Purchases = require('../../models/purchares/index.js');
var Cupones = require('../../models/cupones/index.js');

var config = require('../../../../config/index.js')
var permiso = config.variables.typeUser

var handleSayHello = require('../../utils/sendEmail/index.js')
var generatePDF = require('../../utils/generatePDF/index.js')

var elements = config.plans

route.post('/validate', function (req, res) {

    var data = req.body;

    console.log(data);

    if(data !== null) {
        console.log('hay datos');
        // validando cupon
        if(data.promocion !== '') {
            Cupones.findOne({'title': data.promocion}, (err, cupon) => {

                console.log('CUPOON encontrado')
                console.log(cupon);

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

            })

        } else {

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
        }

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

            // filtro per plan, pick out each plan that have country destiny
            var filter_by_country = [];

            for(var y = 0; y <= elements.length - 1; y++) {
                var element_pack = elements[y].countries;

                // Iteration all country names in this plan
                for(var u = 0; u <= element_pack.length - 1; u++) {
                    var element_pack_country = element_pack[u];

                    // If contry name, exists in this plan, save to array
                    if(element_pack_country === user.cotizator.destino) {
                      // if the value is - student
                      if (elements[y].title !== 'STUDENT') {
                        filter_by_country.push(elements[y])
                        break;
                      }
                    }
                }
            }

            // Evaluate to Add Studen plan to the list ot pick out
           if(Number(user.cotizator.pasajero) > 0) {

             /* Validate place to travel scope */
             var studentCountryScoupe = elements[2].countries

             /* iteration over country scoupe to studen plan */
             studentCountryScoupe.map(function (studenCountryOption) {

              /* Evaluate if user.cotizador.destino is on the scope */
               if (user.cotizator.destino === studenCountryOption) {
                  if( Number(user.cotizator.dias) >= Number(elements[2].pack[0].days) ) {
                    filter_by_country.push(elements[2]);
                  }
               }
              
             })

           }

            // filtrando paquete por dias
            var result_filter_tarifa = [];

            for (var m = 0; m <= filter_by_country.length - 1; m++) {
                var result_filter_element = filter_by_country[m];

                for (var a = 0; a <= result_filter_element.pack.length - 1 ; a++) {
                    var element = result_filter_element.pack[a];

                    var days_value = Number(user.cotizator.dias);

                    // Validate limit if days wish to travel is over the limit -- example 92 > limit 90 ticket plan
                    var last_element = result_filter_element.pack[result_filter_element.pack.length - 1]

                    if(days_value > Number(last_element.days)) {
                      let days_plus = Number(days_value - Number(last_element.days))
                      let price_plus = Number(days_plus * 5)

                      let custom_element_pack = {
                          days: String(days_value),
                          tarifa: String(Number(last_element.tarifa) + price_plus) + '.00'
                      }

                      result_filter_tarifa.push(custom_element_pack)
                      break;

                    } else {
                      // Find pricing by day selected
                      if(Number(element.days) >= days_value) {
                          result_filter_tarifa.push(element)
                          break;
                      }
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

            var filter_do = [];
            var respaldo_filter = elements_filter;

            // adulto mayor incremento del 50%
            console.log('adulto mayor');
            console.log(user.cotizator.adulto_mayor);

            if(Number(user.cotizator.adulto_mayor) > 0) {

                for(var r = 0; r <= elements_filter.length - 1; r++) {

                    var element = elements_filter[r];

                    var value_50_porcent = 0;
                    var value_tarifa_new = 0;

                    if(element.title === 'INTERNATIONAL' ||
                       element.title === 'CLASSIC' ||
                       element.title === 'EUROPA') {

                        element = elements_filter[r];

                        console.log('values');
                        console.log(value_tarifa_new);
                        console.log(value_50_porcent);
                        console.log(value_tarifa_new);

                        value_tarifa_new = Number(element.pack.tarifa);

                        value_50_porcent = (value_tarifa_new / 2);
                        value_tarifa_new = (Number(element.pack.tarifa) + Number(value_50_porcent)) * Number(user.cotizator.adulto_mayor);

                        filter_do.push({
                            title: element.title,
                            pack: {
                                days: element.pack.days,
                                tarifa: String(value_tarifa_new)
                            }
                        });

                    }

                }

            }

            var new_final_price = [];
            if(user.cotizator.promocion !== '' &&
               user.cotizator.promocion !== undefined &&
               user.cotizator.promocion !== null) {

                Cupones.findOne({'title': user.cotizator.promocion}, (err, cupon) => {

                    console.log('CUPOON encontrado')
                    console.log(cupon);

                    var descuento = 0;

                    for(var t = 0; t <= respaldo_filter.length - 1; t++) {
                        var element_respaldo = respaldo_filter[t];

                        var tarifa_cant_pasajero = '';
                        tarifa_cant_pasajero = Number(element_respaldo.pack.tarifa) * Number(user.cotizator.pasajero);

                        var value_viejos = 0;
                        if(filter_do[t] !== undefined) {
                            value_viejos = Number(filter_do[t].pack.tarifa);
                        }

                        var value_price = Number(value_viejos + Number(tarifa_cant_pasajero));

                        descuento = 0;

                        if(cupon !== null && cupon !== undefined) {
                            descuento = Number(value_price) * (Number(cupon.numero_descuento)/100)

                        }

                        new_final_price.push({
                            title: element_respaldo.title,
                            pack: {
                                days: element_respaldo.pack.days,
                                tarifa: String(value_price - descuento)
                            }
                        });

                    }

                    console.log('ORIGINAL');
                    console.log(elements_filter);

                    console.log('RESULTADO');
                    console.log(filter_do);

                    // Calculando cantidad de pasajeros
                    var cant_pasajeros = Number(user.cotizator.pasajero) + Number(user.cotizator.adulto_mayor);

                    // devolver los campos guardados
                    res.render('./plataforma/pricing/index.jade', {
                        code: code,
                        purchase: user.cotizator,
                        packs: new_final_price,
                        cant_pasajeros: cant_pasajeros
                    });

                })

            } else {

                for(var t = 0; t <= respaldo_filter.length - 1; t++) {
                    var element_respaldo = respaldo_filter[t];

                    var tarifa_cant_pasajero = '';
                    tarifa_cant_pasajero = Number(element_respaldo.pack.tarifa) * Number(user.cotizator.pasajero);

                    var value_viejos = 0;
                    if(filter_do[t] !== undefined) {
                        value_viejos = Number(filter_do[t].pack.tarifa);
                    }

                    new_final_price.push({
                        title: element_respaldo.title,
                        pack: {
                            days: element_respaldo.pack.days,
                            tarifa: String(value_viejos + Number(tarifa_cant_pasajero))
                        }
                    });

                }

                console.log('ORIGINAL');
                console.log(elements_filter);

                console.log('RESULTADO');
                console.log(filter_do);

                // Calculando cantidad de pasajeros
                var cant_pasajeros = Number(user.cotizator.pasajero) + Number(user.cotizator.adulto_mayor);

                // devolver los campos guardados
                res.render('./plataforma/pricing/index.jade', {
                    code: code,
                    purchase: user.cotizator,
                    packs: new_final_price,
                    cant_pasajeros: cant_pasajeros
                });

            }
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

route.post('/:code/pack-beneficios', function (req, res) {
    var code = req.params.code;
    var pack_selected = req.body.pack_title;

    var pack_filter = elements.filter((element) => {
        return element.title === pack_selected

    });

    // evaluando los detalles
    var table_left = '';
    var table_right = '';

    var pack_details = pack_filter[0];

    // left
    for(var u in pack_details.card.left) {
        table_left += `<tr align="left">
                            <td align="left" width="75%;">
                                <p style="margin-bottom: 10px;">${ u }</p>
                            </td>
                            <td align="left" width="25%;">
                                <p style="margin-bottom: 10px;">${ pack_details.card.left[`${u}`] }</p>
                            </td>
                        </tr>`
    }

    // right
    for(var a in pack_details.card.right) {
        table_right += `<tr align="left">
                            <td align="left" width="75%;">
                                <p style="margin-bottom: 10px;">${ a }</p>
                            </td>
                            <td align="left" width="25%;">
                                <p style="margin-bottom: 10px;">${ pack_details.card.right[`${a}`] }</p>
                            </td>
                        </tr>`
    }

    var template_pack = `<table width="100%" style="padding-top: 20px;padding-bottom: 20px;">
                            <tr>
                                <td align="center">
                                    <h2 style="font-size: 1.8rem; padding-bottom:.5rem; margin: 0; color: #017098;">${ pack_details.title }</h2>
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <b style="display: block; padding-bottom:1rem; margin: 0; color: #017098;">Tarjeta de asistencia</b>
                                </td>
                            </tr>
                            <tr>
                                <table width="100%">
                                    <th>
                                        <td align="left" valign="top" width="50%">
                                            <table width="100%">
                                                ${ table_left }
                                            </table>
                                        </td>
                                        <td align="left" valign="top" width="50%">
                                            <table width="100%">
                                                ${ table_right }
                                            </table>
                                        </td>
                                    </th>
                                </table>
                            </tr>
                            <tr>
                                <td width="100%"">
                                    <p style="padding-top:1.5rem;">${ pack_details.conditions }</p>
                                </td>
                            </tr>
                        </table>`


    res.status(200).json({
        status: 'ok',
        code: code,
        template_pack: template_pack
    })

});

// Update after user select a item to buy
route.post('/:code/purchare/buy-form', function (req, res) {
    var code = req.params.code;
    var pack_selected = req.body.pack_title;
    var pack_selected_price = req.body.pack_selected_price;

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

                // Validate limit if days wish to travel is over the limit -- example 92 > limit 90 ticket plan
                var last_element = result_filter_element[0].pack[result_filter_element[0].pack.length - 1]

                if(days_value > Number(last_element.days)) {
                  let days_plus = Number(days_value - Number(last_element.days))
                  let price_plus = Number(days_plus * 5)

                  let custom_element_pack = {
                      days: String(days_value),
                      tarifa: String(Number(last_element.tarifa) + price_plus) + '.00'
                  }

                  result_filter_tarifa.push(custom_element_pack)
                  break;

                } else {
                  // Find pricing by day selected
                  if(Number(element.days) >= days_value) {
                      result_filter_tarifa.push(element)
                      break;
                  }
                }
            }

            // Obteniendo tarifa
            user.pack_selected.dias = result_filter_tarifa[0].days;

            // Actualizando tarifa seleccionada
            user.pack_selected.tarifa = pack_selected_price;

            console.log('datos del filtro');
            console.log(result_filter_tarifa);

            // Guardando datos
            user.save((err, saved) => {
                if(err) {
                    return console.log(err);
                }

                console.log(saved);

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

            // Calculando cantidad de pasajeros
            var cant_pasajeros = Number(user.cotizator.pasajero) + Number(user.cotizator.adulto_mayor);

            // devolver los campos guardados
            res.render('./plataforma/form_to_pay/index.jade', {
                code: code,
                pack: user.pack_selected,
                user_cotizador: user.cotizator,
                user_details: user.pack_selected,
                cant_pasajeros: cant_pasajeros
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
            tipo_doc:     req.body.user.tipo_doc  || 'DNI',
            doc_number:   req.body.user.doc_number || '13213123',
            fecha_nacimiento: req.body.user.fecha_nacimiento || '02/21/90',
            email:      req.body.user.email || 'someone@gmail.com',
            domicilio:  req.body.user.domicilio || 'av lima',
            telefono:  req.body.user.telefono || '999999999',
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
            user.account.phone = data_form.user.telefono
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

                console.log('USUARIO UPDATED <----');
                console.log(saved);

                res.status(200).json({
                    status: 'ok',
                    code: saved._id,
                    pack: saved.pack_selected
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

    Purchases.find((err, users) => {
        if(err) {
            return res.status(400).json({
                status: 'bat_request',
                message: 'error code not valid'
            })
        }

        // Filtrando
        var polizas = users
                .filter((element) => {
                    return element.access === permiso.premium;
                })
                .filter((element) => {
                    return element.account.doc_number === dni;
                })

        var user = polizas[polizas.length - 1];

        if(user !== null) {
            res.status(200).json({
                status: 'ok',
                dni: dni,
                code: user._id,
                data: {
                    numero_pedido: user.account.numero_pedido,
                    charge_id: user.account.ticket
                }
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
            res.render('./plataforma/pdf/index.jade', {
                status: 'Obtener Poliza',
                message: 'No tienes una poliza registrada',
                help:  'puedes cotizar tu destino y tendras tu poliza al instante',
                code: code,
                pack: 'not_register',
                pdf: '/'
            });
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

                var pack_filter = pack_details[0];

                generatePDF(user, pack_filter, venta, function (err, result) {
                    if(err) {
                        return res.status(500).json({
                            status: 'error_server',
                            error: err,
                            message: 'Error al enviar el email'
                        })
                    }

                    console.log('PDF final terminado');
                    console.log(result);

                    value_to_download = `/news/${ code }.pdf`;

                    // Enviando email con link de descarga
                    var datos_form = {
                        nombre:   user.account.names,
                        email:    user.account.email,
                        message:  ''
                    }

                    // Guardar en la db
                    console.log('to send email');
                    console.log(datos_form);

                    // template content

                    var template_content = {
                        title: datos_form.nombre + ', !Tu poliza de viaje esta lista¡',
                        receptores: [datos_form.email],
                        template: `<table width="100%">
                                        <tr>
                                           <td>
                                                <div>
                                                    <p>Hola ${ datos_form.nombre }, tu poliza de viaje esta lista, puedes descargarla cuando quieres, desde este enlace</p>
                                                </div>
                                           </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                 <div>
                                                     <p>http://assistabi.com/plataform-pricing/${ user._id }/key-pdf?numero_pedido=${ user.account.numero_pedido }&ticket=${ user.account.ticket }</p>
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

                        res.render('./plataforma/pdf/index.jade', {
                            status: 'Abre tu poliza',
                            message: '!Gracias, tu compra fue exitosa¡',
                            help:  'Una copia se ha enviado a tu correo',
                            code: code,
                            pack: user.pack_selected,
                            pdf: value_to_download
                        });

                    })

                });

            } else {

                value_to_download = 'not_access';

                console.log('DATOS ACTUAL DEL USUARIO - pdf');
                console.log(user);

                // devolver los campos guardados
                res.render('./plataforma/pdf/index.jade', {
                    status: 'Obtener Poliza',
                    message: 'No tienes una poliza registrada',
                    help:  'puedes cotizar tu destino y tendras tu poliza al instante',
                    code: code,
                    pack: 'not_access',
                    pdf: '/'
                });

            }

        } else {
            console.log('Usuario no encontrado');

            res.render('./plataforma/pdf/index.jade', {
                status: 'Obtener Poliza',
                message: 'No tienes una poliza registrada',
                help:  'puedes cotizar tu destino y tendras tu poliza al instante',
                code: code,
                pack: 'not_register',
                pdf: '/'
            });
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
