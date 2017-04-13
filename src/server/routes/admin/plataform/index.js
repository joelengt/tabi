var express = require('express');
var passport = require('passport')

var route = express.Router();
var Purchases = require('../../../models/purchares/index.js');
var Cupones = require('../../../models/cupones/index.js');

var config = require('../../../../../config/index.js')

var generadorDescuentoController = require('../../../controllers/GeneradorDescuento/index.js');
var GeneradorDescuento = new generadorDescuentoController();

const fs = require('fs');
const htmlTo = require('html2xlsx');

function ensureAuthorized(req, res, next) {
    var bearerToken
    var bearerHeader = req.body

    console.log('Token recibido del usuario')
    console.log(bearerHeader)

    if (typeof bearerHeader !== 'undefined') {
        console.log('Pasando el token en el req')
        
        var msg = '';

        if(bearerHeader.username === config.auth.admin.user) {

            if(bearerHeader.password === config.auth.admin.pass) {

                next();

            } else  {
                msg = 'La contraseña no es correcta';

                var response = {
                    status: msg,
                    type: false,
                    error: 'El token de usuario no esta registrado'
                };

                // res.status(401).json(response)

                res.render('./admin/login/index.jade', response);

            }

        } else {
            msg = 'El usuario no es correcto';

            var response = {
                status: msg,
                type: false,
                error: 'El token de usuario no esta registrado'
            };

            // res.status(401).json(response)

            res.render('./admin/login/index.jade', response);

        }


    } else {
        var response = {
            status: 'No Autentificado',
            type: false,
            error: 'El token de usuario no esta registrado'
        };

        // res.status(401).json(response)

        res.render('./admin/login/index.jade', response);
    }
}


var element_title = [
    'origen',
    'destino',
    'tipo_viaje',
    'salida',
    'regreso',
    'dias',
    'pasajero',
    'adulto_mayor',
    'promocion',
    'email',
    'pack_select_title',
    'pack_select_dias',
    'pack_select_tarifa',
    'account_names',
    'account_last_names',
    'account_full_name',
    'account_tipo_doc',
    'account_doc_number',
    'account_email',
    'account_domicilio',
    'account_permiso',
    'account_ciudad',
    'account_address',
    'account_phone',
    'account_contact_emergencia_nombres',
    'account_contact_emergencia_apellidos',
    'account_contact_emergencia_telefono',
    'account_contact_emergencia_email',
    'account_status_purchare',
    'account_fecha_creada',
    'account_numero_pedido',
    'account_id_venta',
    'venta_date',
    'access'
];

route.get('/login', function (req, res) {

    var response = {
        type: false
    };

    res.render('./admin/login/index.jade', response);

})


// passport config
route.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/login')
})

// Auth plataforma cliente mobile
route.post('/auth/plataforma', ensureAuthorized, function (req, res) {
    // do something with req.user

    res.render('./admin/plataforma/index.jade');
    
})

route.get('/plataforma/usuarios', function (req, res) {
    // do something with req.user

    var filter_month = req.query.mes;
    console.log('MES');
    console.log(filter_month);

    var month_select = 'todos';

    if(filter_month !== undefined && 
       filter_month !== null) {

        switch(filter_month) {
            case 'enero':
                month_select = 1;
                break;

            case 'febrero':
                month_select = 2;
                break;

            case 'marzo':
                month_select = 3;
                break;

            case 'abril':
                month_select = 4;
                break;

            case 'mayo':
                month_select = 5;
                break;

            case 'junio':
                month_select = 5;
                break;

            case 'julio':
                month_select = 5;
                break;

            case 'agosto':
                month_select = 5;
                break;

            case 'septiembre':
                month_select = 5;
                break;

            case 'octubre':
                month_select = 5;
                break;

            case 'noviembre':
                month_select = 5;
                break;

            case 'diciembre':
                month_select = 5;
                break;
        }

    }

    // fecha actual
    var data_actual = new Date();

    // Consultando base de datos
    Purchases.find((err, users) => {
        if(err) {
            return res.status(400).json({
                status: 'bat_request',
                message: 'error code not valid'
            })
        }

        if(users !== null) {

            // filtrando a los usuarios pagos
            var users_pay = users.filter((element) => {
                return element.access === config.variables.typeUser.premium;
            })

            // Generando excel
            var subtitle = '';
            var list_all = '';
            var list_pay = '';

            // Generando subtitle
            for(var u = 0; u <= element_title.length - 1; u++) {
                subtitle += `<td>${ element_title[u] }</td>`;
            }

            // Generando lista de todos
            for(var a = 0; a <= users.length - 1; a++) {

                // Evaluando pretty date creation purchare
                var date_numero_pedido = users[a].account.numero_pedido;
                var date_purchare = new Date(Number(date_numero_pedido.replace('NRAS000','')));

                var date_purchare_pretty = `${ date_purchare.getDate() }-${ date_purchare.getMonth() + 1 }-${ date_purchare.getFullYear() }`;

                // Evaluando mes
                if(month_select === 'todos') {

                    list_all += `<tr>
                                    <td>${ users[a].cotizator.origen }</td>
                                    <td>${ users[a].cotizator.destino }</td>
                                    <td>${ users[a].cotizator.tipo_viaje }</td>
                                    <td>${ users[a].cotizator.salida }</td>
                                    <td>${ users[a].cotizator.regreso }</td>
                                    <td>${ users[a].cotizator.dias }</td>
                                    <td>${ users[a].cotizator.pasajero }</td>
                                    <td>${ users[a].cotizator.adulto_mayor }</td>
                                    <td>${ users[a].cotizator.promocion }</td>
                                    <td>${ users[a].cotizator.email }</td>
                                    <td>${ users[a].pack_selected.title }</td>
                                    <td>${ users[a].pack_selected.dias }</td>
                                    <td>${ users[a].pack_selected.tarifa }</td>
                                    <td>${ users[a].account.names }</td>
                                    <td>${ users[a].account.last_names }</td>
                                    <td>${ users[a].account.full_name }</td>
                                    <td>${ users[a].account.tipo_doc }</td>
                                    <td>${ users[a].account.doc_number }</td>
                                    <td>${ users[a].account.email }</td>
                                    <td>${ users[a].account.domicilio }</td>
                                    <td>${ users[a].account.permiso }</td>
                                    <td>${ users[a].account.ciudad }</td>
                                    <td>${ users[a].account.address }</td>
                                    <td>${ users[a].account.phone }</td>
                                    <td>${ users[a].account.contact_emergencia.nombres }</td>
                                    <td>${ users[a].account.contact_emergencia.apellidos }</td>
                                    <td>${ users[a].account.contact_emergencia.telefono }</td>
                                    <td>${ users[a].account.contact_emergencia.email }</td>
                                    <td>${ users[a].account.status_purchare }</td>
                                    <td>${ users[a].account.fecha_creada }</td>
                                    <td>${ users[a].account.numero_pedido}</td>
                                    <td>${ users[a].account.ticket }</td>
                                    <td>${ date_purchare_pretty }</td>
                                    <td>${ users[a].access }</td>
                                </tr>`;

                } else {

                    if(month_select === date_purchare.getMonth() + 1 &&
                      data_actual.getFullYear() === date_purchare.getFullYear()) {

                        list_all += `<tr>
                                        <td>${ users[a].cotizator.origen }</td>
                                        <td>${ users[a].cotizator.destino }</td>
                                        <td>${ users[a].cotizator.tipo_viaje }</td>
                                        <td>${ users[a].cotizator.salida }</td>
                                        <td>${ users[a].cotizator.regreso }</td>
                                        <td>${ users[a].cotizator.dias }</td>
                                        <td>${ users[a].cotizator.pasajero }</td>
                                        <td>${ users[a].cotizator.adulto_mayor }</td>
                                        <td>${ users[a].cotizator.promocion }</td>
                                        <td>${ users[a].cotizator.email }</td>
                                        <td>${ users[a].pack_selected.title }</td>
                                        <td>${ users[a].pack_selected.dias }</td>
                                        <td>${ users[a].pack_selected.tarifa }</td>
                                        <td>${ users[a].account.names }</td>
                                        <td>${ users[a].account.last_names }</td>
                                        <td>${ users[a].account.full_name }</td>
                                        <td>${ users[a].account.tipo_doc }</td>
                                        <td>${ users[a].account.doc_number }</td>
                                        <td>${ users[a].account.email }</td>
                                        <td>${ users[a].account.domicilio }</td>
                                        <td>${ users[a].account.permiso }</td>
                                        <td>${ users[a].account.ciudad }</td>
                                        <td>${ users[a].account.address }</td>
                                        <td>${ users[a].account.phone }</td>
                                        <td>${ users[a].account.contact_emergencia.nombres }</td>
                                        <td>${ users[a].account.contact_emergencia.apellidos }</td>
                                        <td>${ users[a].account.contact_emergencia.telefono }</td>
                                        <td>${ users[a].account.contact_emergencia.email }</td>
                                        <td>${ users[a].account.status_purchare }</td>
                                        <td>${ users[a].account.fecha_creada }</td>
                                        <td>${ users[a].account.numero_pedido}</td>
                                        <td>${ users[a].account.ticket }</td>
                                        <td>${ date_purchare_pretty }</td>
                                        <td>${ users[a].access }</td>
                                    </tr>`;
                    }
                }
            }

            // Generando lista de pagos
            for(var b = 0; b <= users_pay.length - 1; b++) {

                // Evaluando pretty date creation purchare
                var date_numero_pedido = users_pay[b].account.numero_pedido;
                var date_purchare = new Date(Number(date_numero_pedido.replace('NRAS000','')));

                var date_purchare_pretty = `${ date_purchare.getDate() }-${ date_purchare.getMonth() + 1 }-${ date_purchare.getFullYear() }`;

                if(month_select === 'todos') {

                    list_pay += `<tr>
                                    <td>${ users_pay[b].cotizator.origen }</td>
                                    <td>${ users_pay[b].cotizator.destino }</td>
                                    <td>${ users_pay[b].cotizator.tipo_viaje }</td>
                                    <td>${ users_pay[b].cotizator.salida }</td>
                                    <td>${ users_pay[b].cotizator.regreso }</td>
                                    <td>${ users_pay[b].cotizator.dias }</td>
                                    <td>${ users_pay[b].cotizator.pasajero }</td>
                                    <td>${ users_pay[b].cotizator.adulto_mayor }</td>
                                    <td>${ users_pay[b].cotizator.promocion }</td>
                                    <td>${ users_pay[b].cotizator.email }</td>
                                    <td>${ users_pay[b].pack_selected.title }</td>
                                    <td>${ users_pay[b].pack_selected.dias }</td>
                                    <td>${ users_pay[b].pack_selected.tarifa }</td>
                                    <td>${ users_pay[b].account.names }</td>
                                    <td>${ users_pay[b].account.last_names }</td>
                                    <td>${ users_pay[b].account.full_name }</td>
                                    <td>${ users_pay[b].account.tipo_doc }</td>
                                    <td>${ users_pay[b].account.doc_number }</td>
                                    <td>${ users_pay[b].account.email }</td>
                                    <td>${ users_pay[b].account.domicilio }</td>
                                    <td>${ users_pay[b].account.permiso }</td>
                                    <td>${ users_pay[b].account.ciudad }</td>
                                    <td>${ users_pay[b].account.address }</td>
                                    <td>${ users_pay[b].account.phone }</td>
                                    <td>${ users_pay[b].account.contact_emergencia.nombres }</td>
                                    <td>${ users_pay[b].account.contact_emergencia.apellidos }</td>
                                    <td>${ users_pay[b].account.contact_emergencia.telefono }</td>
                                    <td>${ users_pay[b].account.contact_emergencia.email }</td>
                                    <td>${ users_pay[b].account.status_purchare }</td>
                                    <td>${ users_pay[b].account.fecha_creada }</td>
                                    <td>${ users_pay[b].account.numero_pedido}</td>
                                    <td>${ users_pay[b].account.ticket }</td>
                                    <td>${ date_purchare_pretty }</td>
                                    <td>${ users_pay[b].access }</td>
                                </tr>`;

                } else {

                    if(month_select === date_purchare.getMonth() + 1  &&
                       data_actual.getFullYear() === date_purchare.getFullYear()) {

                        list_pay += `<tr>
                                        <td>${ users_pay[b].cotizator.origen }</td>
                                        <td>${ users_pay[b].cotizator.destino }</td>
                                        <td>${ users_pay[b].cotizator.tipo_viaje }</td>
                                        <td>${ users_pay[b].cotizator.salida }</td>
                                        <td>${ users_pay[b].cotizator.regreso }</td>
                                        <td>${ users_pay[b].cotizator.dias }</td>
                                        <td>${ users_pay[b].cotizator.pasajero }</td>
                                        <td>${ users_pay[b].cotizator.adulto_mayor }</td>
                                        <td>${ users_pay[b].cotizator.promocion }</td>
                                        <td>${ users_pay[b].cotizator.email }</td>
                                        <td>${ users_pay[b].pack_selected.title }</td>
                                        <td>${ users_pay[b].pack_selected.dias }</td>
                                        <td>${ users_pay[b].pack_selected.tarifa }</td>
                                        <td>${ users_pay[b].account.names }</td>
                                        <td>${ users_pay[b].account.last_names }</td>
                                        <td>${ users_pay[b].account.full_name }</td>
                                        <td>${ users_pay[b].account.tipo_doc }</td>
                                        <td>${ users_pay[b].account.doc_number }</td>
                                        <td>${ users_pay[b].account.email }</td>
                                        <td>${ users_pay[b].account.domicilio }</td>
                                        <td>${ users_pay[b].account.permiso }</td>
                                        <td>${ users_pay[b].account.ciudad }</td>
                                        <td>${ users_pay[b].account.address }</td>
                                        <td>${ users_pay[b].account.phone }</td>
                                        <td>${ users_pay[b].account.contact_emergencia.nombres }</td>
                                        <td>${ users_pay[b].account.contact_emergencia.apellidos }</td>
                                        <td>${ users_pay[b].account.contact_emergencia.telefono }</td>
                                        <td>${ users_pay[b].account.contact_emergencia.email }</td>
                                        <td>${ users_pay[b].account.status_purchare }</td>
                                        <td>${ users_pay[b].account.fecha_creada }</td>
                                        <td>${ users_pay[b].account.numero_pedido}</td>
                                        <td>${ users_pay[b].account.ticket }</td>
                                        <td>${ date_purchare_pretty }</td>
                                        <td>${ users_pay[b].access }</td>
                                    </tr>`;
                    }
                }

            }

            var template_all = `
              <table>
                <tr bgColor="#f0e7e7">
                  ${ subtitle }
                </tr>
                ${ list_all }
              </table>
            `;

            var template_pay = `
              <table>
                <tr bgColor="#f0e7e7">
                  ${ subtitle }
                </tr>
                ${ list_pay }
              </table>
            `;

            htmlTo(template_all, (err, file) => {
              if (err) return console.error(err);
              
              file.saveAs()
                .pipe(fs.createWriteStream('./uploads/news/tabi_users_all.xlsx'))
                .on('finish', () => {
                    console.log('Done tabi_users_all .');

                    htmlTo(template_pay, (err, file) => {
                      if (err) return console.error(err);
                      
                      file.saveAs()
                        .pipe(fs.createWriteStream('./uploads/news/tabi_users_pay.xlsx'))
                        .on('finish', () => {
                            console.log('Done tabi_users_pay');

                            var response = {
                                type: false,
                                sources: {
                                    all: '/news/tabi_users_all.xlsx',
                                    pay: '/news/tabi_users_pay.xlsx'
                                },
                                filter: filter_month
                            };

                            res.render('./admin/plataforma/descargar_excel/index.jade', response);

                        });
                    });

                });
            });

        }
    })
    
})


// Routes generator descuento - list
route.get('/generator/list', function (req, res) {

    Cupones.find((err, cupones) => {
        if(err) {
            return res.status(500).json({
                status: 'error',
                error: err
            })
        }

        res.status(200).json({
            status: 'ok',
            cupones: cupones
        })

    })
    
})

// Routes generator descuento - create
route.post('/generator/create', function (req, res) {

    var data = {
        title:            req.body.cupon_title,
        numero_descuento: req.body.cupon_numero_descuento
    }

    data.title = data.title.toUpperCase();

    if (data.title !== '' &&
        data.numero_descuento !== '') {

        var cupon = new Cupones(data);

        cupon.save((err, saved) => {
            if(err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al guardar el cupoon',
                    err: err
                })
            }

            Cupones.find((err, cupones) => {
                if(err) {
                    return res.status(500).json({
                        status: 'error',
                        error: err
                    })
                }

                console.log('CUPONES');
                console.log(cupones);

                res.render('./admin/plataforma/descuento/index.jade', {
                    status: 'ok',
                    cupones: cupones,
                    message: 'El cupon fue creado'
                })

            })

        })

    } else {

        res.render('./admin/plataforma/descuento/index.jade', {
            status: 'bad request',
            message: 'Los campos deben tener contenido válido'
        })

    }
    
    
})

// Routes generator descuento - id
route.get('/generator/:id', function (req, res) {
    // do something with req.user

    var cupon_id = req.params.id;

    Cupones.findById({'_id': cupon_id}, (err, cupon) => {
        if(err) {
            return res.status(500).json({
                status: 'error',
                error: err
            })
        }

        res.status(200).json({
            status: 'ok',
            cupon: cupon
        })

    })
    
})

// Routes generator descuento - delete
route.delete('/generator/:id/delete', function (req, res) {
    // do something with req.user

    var cupon_id = req.params.id;

    Cupones.remove({'_id': cupon_id}, (err, cupon) => {
        if(err) {
            return res.status(500).json({
                status: 'error',
                error: err
            })
        }

        Cupones.find((err, cupones) => {
            if(err) {
                return res.status(500).json({
                    status: 'error',
                    error: err
                })
            }

            console.log('CUPONES');
            console.log(cupones);

            res.render('./admin/plataforma/descuento/index.jade', {
                status: 'ok',
                cupones: cupones,
                message: `El cupon fue eliminado`
            })

        })

    })
})

// render view cupones
route.get('/generator/template/view', function (req, res) {
    // do something with req.user
    console.log('render vire');

    Cupones.find((err, cupones) => {
        if(err) {
            return res.status(500).json({
                status: 'error',
                error: err
            })
        }

        console.log('CUPONES');
        console.log(cupones);

        res.render('./admin/plataforma/descuento/index.jade', {
            status: 'ok',
            cupones: cupones
        })


    })
    
})

module.exports = route;
