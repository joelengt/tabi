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
      countries: ['Mundial - No Europa', 'USA'],
      card: {
          'left': {
              'Asistencia médica en caso de accidente': 'USD 20,000',
              'Asistencia médica en caso de enfermedad': 'USD 20,000',
              'Asistencia médica en caso pre-existencia': 'USD 1,000',
              'Medicamentos ambulatorios': 'USD 350',
              'Medicamentos por Hospitalización': 'USD 500',
              'Asistencia por Practica de Deporte': 'USD 3,000',
              'Hospitalización': 'SI',
              'Asistencia en caso de extravío de documentos': 'SI',
              'Cancelacion de Vuelo': 'USD 500',
              'Acompañamiento de Menores': 'SI',
              'Gastos de hotel por convalecencia': 'USD 350',
              'Embarazo (hasta semana 24)': 'USD 2,000',
              'Viaje de regreso por enfermedad.': 'NO'
          },
          'right': {
              'Repatriación de restos': 'USD 20,000',
              'Traslado y repatriación sanitaria': 'USD 20,000',
              'Odontología de urgencia': 'USD 230',
              'Compensación por pérdida de equipaje': 'USD 1,200',
              'Gastos por demora de equipaje': 'USD 100',
              'Traslado de un familiar en caso de internación': 'SI',
              'Asistencia legal en caso de accidente de tránsito': 'USD 2,300',
              'Transferencia de fondos para fianzas legal': 'USD 15,000',
              'Transferencia de fondos': 'USD 1,000',
              'Transmisión de mensajes urgentes.': 'SI',
              'Responsabilidad Civil (daño a terceros)': 'USD 500',
              'Línea Medica 24 hs.': 'SI',
              'Límite de edad': '84 años'
          }
      },
      telephones: {
        left: {
          'Argentina': '(+54) 1150328122',
          'Australia': '(+61) 280 113 497',
          'Brasil': '(+55) 113 042 2868',
          'Canadá': '(+1) 800 969 5192',
          'Chile': '(+56) 225 813 553',
          'Colombia': '(+57) 1 381 65 58',
          'Colombia': '(+57) 5 316 1038',
          'Ecuador': '(+593) 225 505 82',
          'Europa': '(+34) 910 80 76 58'
        },
        right: {
          'Hong Kong': '(+852) 8199 0280',
          'Israel': '(+972) 237 401 40',
          'México': '(+52) 558 421 2528',
          'Panamá': '(+507) 83 36 754',
          'Perú': '(+51) 1 641 92 32',
          'Reino Unido': '(+44) 207 1934746',
          'República Dom.': '(+1) 829 249 6982',
          'Venezuela': '(+58) 2123357800',
          'USA / Caribe': '(+1) 302 300 1734'
        }
      },
      whatsapp: '(+1) 954 2744 943 - (+1) 904 8885508',
      conditions: '(*) para aplicar los gastos de cancelacion de viaje se aplica un deducible 25% (**) y para los pasajeros de 75 a 85 años se incrementa la tarifa en un 50% mas. Para mayor informacion consultar las condiciones generales.'
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
      countries: ['Europa'],
      card: {
          'left': {
              'Asistencia médica en caso de accidente': 'EUR 75,000',
              'Asistencia médica en caso de enfermedad': 'EUR 75,000',
              'Compensacion por muerte en transporte publico': 'EUR 10,000',
              'Asistencia médica en caso pre-existencia': 'EUR 1,000',
              'Medicamentos ambulatorios': 'EUR 350',
              'Medicamentos por Hospitalizacion': 'EUR 500',
              'Asistencia por Practica de Deporte': 'EUR 3,000',
              'Hospitalizacion': 'SI',
              'Asistencia en caso de extravío de documentos': 'SI',
              'Cancelacion de Vuelo': 'EUR 500',
              'Acompañamiento de Menores': 'SI',
              'Gastos de hotel por convalecencia': 'EUR 350',
              'Embarazo (hasta semana 24)': 'EUR 2,000'
          },
          'right': {
              'Repatriación de restos.': 'EUR 30,000',
              'Traslado y repatriación sanitaria.': 'EUR 30,000',
              'Odontología de urgencia': 'EUR 230',
              'Compensación por pérdida de equipaje': 'EUR 1,200',
              'Gastos por demora de equipaje': 'EUR 100',
              'Traslado de un familiar en caso de internación': 'SI',
              'Asistencia legal en caso de accidente de tránsito': 'EUR 2,300',
              'Transferencia de fondos para fianza legal': 'EUR 15,000',
              'Transferencia de fondos': 'EUR 1,000',
              'Transmisión de mensajes urgentes.': 'SI',
              'Responsabilidad Civil (daño a terceros)': 'EUR 500',
              'Línea Medica 24 hs.': 'SI',
              'Límite de edad': '84 años',
          }
      },
      telephones: {
        left: {
          'Argentina': '(+54) 1150328122',
          'Australia': '(+61) 280 113 497',
          'Brasil': '(+55) 113 042 2868',
          'Canadá': '(+1) 800 969 5192',
          'Chile': '(+56) 225 813 553',
          'Colombia': '(+57) 1 381 65 58',
          'Colombia': '(+57) 5 316 1038',
          'Ecuador': '(+593) 225 505 82',
          'Europa': '(+34) 910 80 76 58'
        },
        right: {
          'Hong Kong': '(+852) 8199 0280',
          'Israel': '(+972) 237 401 40',
          'México': '(+52) 558 421 2528',
          'Panamá': '(+507) 83 36 754',
          'Perú': '(+51) 1 641 92 32',
          'Reino Unido': '(+44) 207 1934746',
          'República Dom.': '(+1) 829 249 6982',
          'Venezuela': '(+58) 2123357800',
          'USA / Caribe': '(+1) 302 300 1734'
        }
      },
      whatsapp: '(+1) 954 2744 943 - (+1) 904 8885508',
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
      countries: ['Europa', 'Mundial'],
      card: {
          'left': {
              'Asistencia médica en caso de accidente': 'EUR 60,000',
              'Asistencia médica en caso de enfermedad': 'EUR 60,000',
              'Asistencia médica en caso pre-existencia': 'USD 300',
              'Medicamentos ambulatorios': 'USD 1,000',
              'Días complementarios de internación': '5 días',
              'Hospitalizacion': 'SI',
              'Asistencia en caso de extravío de documentos': 'SI',
              'Gastos de hotel familiar acompañante': 'USD 500',
              'Gastos de hotel por convalecencia': 'USD 300',
              'Embarazo (hasta semana 24)': 'SI',
              'Viaje de regreso por enfermedad.': 'SI',
              'Repatriación de restos.': 'SI'
          },
          'right': {
              'Traslado y repatriación sanitaria.': 'SI',
              'Odontología': 'USD 350',
              'Compensación por pérdida de equipaje': 'USD 500',
              'Gastos por demora de equipaje': 'USD 100',
              'Traslado de un familiar en caso de internación': 'SI',
              'Asistencia legal en caso de accidente de tránsito': 'USD 1,000',
              'Adelanto de fianzas': 'USD 2,500',
              'Transferencia de fondos': 'USD 2,000',
              'Transmisión de mensajes urgentes.': 'SI',
              'Línea de consulta 24 hs.': 'SI',
              'Límite de edad': '50 años'
          }
      },
      telephones: {
        left: {
          'Argentina Nacional': '0800 444 2774',
          'Argentina': '(+54) 11 21503000',
          'Australia': '(+61) 29 1882134',
          'Brasil': '(+55) 800 5911025',
          'Chile': '(+56) 22 9381224',
          'Colombia': '(+57) 1 3819062',
          'España': '(+34) 800 080022',
          'Estados Unidos': '(+1) 855 8596448',
          'Francia': '(+33) 805 321022',
          'Holanda': '(+31) 20 2170259',
          'Israel': '(+972) 1809 494502'
        },
        right: {
          'Italia': '(+39) 800 142822',
          'México': '(+52) 800 2691349',
          'Perú': '(+51) 1 6419109',
          'Portugal': '(+35) 800 502305',
          'Reino Unido': '(+44) 800 9496900',
          'Rep. Dominicana ': '(+1) 829 9465940',
          'Sudáfrica': '(+27) 87 5501907',
          'Tailandia': '(+66) 60 0035058',
          'Uruguay': '(+598) 25182441',
          'Resto del mundo': '(+598) 25182441',
          'Fax': '(+54) 11 3220 2199'
        }
      },
      whatsapp: '(+54) 911 35869793',
      'conditions': 'Para mayor informacion consultar las condiciones generales.'
  }
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

/*
* Users API
*/
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

/*
* Orders API
*/

// Order list 
route.get('/plataforma/orders', (req, res) => {

  // Get Current Purcharses
  Purchases.find({'access': config.variables.typeUser.premium}, (err, orders) => {
    if(err) {
        return res.status(400).json({
            status: 'bat_request',
            message: 'error code not valid'
        })
    }

    res.render('./admin/plataforma/Orders/index.jade', {
      status: 'ok',
      orders: orders
    });

  })

})

// Order Item by id 
route.get('/plataforma/orders/:id', (req, res) => {

  let orderItemID = req.params.id

  // Get Current Purcharses
  Purchases.findOne({'_id': orderItemID, 'access': config.variables.typeUser.premium}, (err, order) => {
    if(err) {
        return res.status(400).json({
            status: 'bat_request',
            message: 'error code not valid'
        })
    }

    if (!order) {
      return res.status(404).json({
          status: 'bat_request',
          message: 'Not found'
      })
    }

    let orderItem = order

    res.render('./admin/plataforma/Orders/item.jade', {
      status: 'ok',
      order: orderItem
    });

  })

})

// Order Item update by id 
route.put('/plataforma/orders/:id', (req, res) => {

  let orderItemID = req.params.id
  let userData = req.body

  Purchases.findOne({'_id': orderItemID, 'access': config.variables.typeUser.premium}, (err, order) => {
    if(err) {
        return res.status(400).json({
            status: 'bat_request',
            message: 'error code not valid'
        })
    }

    console.log('status saved??', order)

    if (!order) {
      return res.status(404).json({
          status: 'bat_request',
          message: 'Not found'
      })
    }

    let data = {
      account: {
        names:         userData.names || '',
        last_names:    userData.last_names || '',
        full_name:     (userData.names + ' ' + userData.last_names) || '',
        fecha_nacimiento: userData.fecha_nacimiento || '',
        tipo_doc:      userData.tipo_doc || '',
        doc_number:    userData.doc_number || '',
        email:         userData.doc_number || '',
        domicilio:     userData.domicilio || '',
        // permiso:       userData.names,
        ciudad:      userData.ciudad || '',
        address:     userData.address || '',
        phone:       userData.phone || '',
        contact_emergencia: {
            nombres:   userData.contact_emergencia_nombres || '',
            apellidos: userData.contact_emergencia_apellidos || '',
            telefono:  userData.contact_emergencia_telefono || '',
            email:     userData.contact_emergencia_email || ''
        },
        // status_purchare: userData.names,
        // fecha_creada:  userData.names,
        // numero_pedido: userData.names,
        // ticket:        userData.names
      }
    }

    Purchases.update({'_id': orderItemID, 'access': config.variables.typeUser.premium}, data, (err, order) => {
      if(err) {
          return res.status(400).json({
              status: 'bat_request',
              message: 'error code not valid'
          })
      }

      console.log('status saved??', order)

      if (!order) {
        return res.status(404).json({
            status: 'bat_request',
            message: 'Not found'
        })
      }

      return res.redirect('/admin/plataforma/orders/' + orderItemID)

    })

  })

})

// Order Item delete by id 
route.delete('/plataforma/orders/:id', (req, res) => {

  let orderItemID = req.params.id

  // Get Current Purcharses
  Purchases.remove({'_id': orderItemID, 'access': config.variables.typeUser.premium}, (err, order) => {
    if(err) {
        return res.status(500).json({
            status: 'error',
            error: err
        })
    }

    return res.redirect('/admin/plataforma/orders')

  })

})

// Order Item view to edit
route.get('/plataforma/orders/:id/edit', (req, res) => {

  let orderItemID = req.params.id

  // Get Current Purcharses
  Purchases.find({'_id': orderItemID, 'access': config.variables.typeUser.premium}, (err, order) => {
    if(err) {
        return res.status(400).json({
            status: 'bat_request',
            message: 'error code not valid'
        })
    }

    if (!order) {
      return res.status(404).json({
          status: 'bat_request',
          message: 'Not found'
      })
    }

    let orderItem = order[0]

    res.render('./admin/plataforma/Orders/edit.jade', {
      status: 'ok',
      order: orderItem
    });

  })

})

// Order from to create 
route.post('/plataforma/orders/create', (req, res) => {

  console.log('SAMPLE??')

  /* Create a Order */
  var data = {
    origen: 'Perú',
    destino: 'USA',
    tipo_viaje: 'Multiviaje',
    salida: '2017-12-28',
    regreso: '2018-02-10',
    dias: '45',
    pasajero: '1',
    adulto_mayor: '0',
    promocion: '',
    email: 'joel.gonzales2110@gmail.com'
  }

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
                  // return res.status(200).json({
                  //     status: 'ok',
                  //     code: saved._id
                  // });

                  return res.redirect('/admin/plataforma/orders/create/' + saved._id)

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
              // return res.status(200).json({
              //     status: 'ok',
              //     code: saved._id
              // });

              return res.redirect('/admin/plataforma/orders/create/' + saved._id)

          })
      }

  } else {
      console.log('NO hay datos');
      return res.status(400).json({
          status: 'bad_request'
      });

  }

})

route.get('/plataforma/orders/create/:code', function (req, res) {
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

                        filter_by_country.push(elements[y]);
                        break;
                    }
                }
            }

            // Add plan student
           if(Number(user.cotizator.pasajero) > 0) {
                if( Number(user.cotizator.dias) >= Number(elements[2].pack[0].days) ) {
                    filter_by_country.push(elements[2]);
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
                    res.render('./admin/plataforma/Orders/create.jade', {
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
                res.render('./admin/plataforma/Orders/create.jade', {
                    code: code,
                    purchase: user.cotizator,
                    packs: new_final_price,
                    cant_pasajeros: cant_pasajeros
                });

            }
        }
    })

});

/*
* Generator API
*/

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
