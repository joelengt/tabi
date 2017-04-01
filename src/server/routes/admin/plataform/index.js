var express = require('express');
var passport = require('passport')

var route = express.Router();

var config = require('../../../../../config/index.js')

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

    console.log('Data : ')
    console.log(req.body)
    
    // Generando excel
    var template_all = `
      <style type="text/css">
        table td {
          color: #666;
          height: 20px;
          background-color: #f1f1f1;
          border: 1px solid #eee;
        }
      </style>
      <table>
        <tr>
          <td>Todos Usuarios</td>
          <td>bar</td>
        </tr>
        <tr>
          <td>hello</td>
          <td>world</td>
        </tr>
        <tr>
          <td type="number">123</td>
          <td type="number">123.456</td>
        </tr>
        <tr>
          <td data-type="bool">true</td>
          <td data-type="bool">false</td>
        </tr>
        <tr>
          <td data-type="bool">1</td>
          <td data-type="bool">0</td>
        </tr>
        <tr>
          <td type="formula">SUM(A1:B1)</td>
          <td type="formula">A1-B1</td>
        </tr>
        <tr>
          <td type="date">2013-01-12T12:34:56+08:00</td>
          <td type="datetime">2013-01-12T12:34:56+08:00</td>
        </tr>
      </table>
    `;
    var template_pay = `
      <style type="text/css">
        table td {
          color: #666;
          height: 20px;
          background-color: #f1f1f1;
          border: 1px solid #eee;
        }
      </style>
      <table>
        <tr>
          <td>Usuarios pagos</td>
          <td>bar</td>
        </tr>
        <tr>
          <td>hello</td>
          <td>world</td>
        </tr>
        <tr>
          <td type="number">123</td>
          <td type="number">123.456</td>
        </tr>
        <tr>
          <td data-type="bool">true</td>
          <td data-type="bool">false</td>
        </tr>
        <tr>
          <td data-type="bool">1</td>
          <td data-type="bool">0</td>
        </tr>
        <tr>
          <td type="formula">SUM(A1:B1)</td>
          <td type="formula">A1-B1</td>
        </tr>
        <tr>
          <td type="date">2013-01-12T12:34:56+08:00</td>
          <td type="datetime">2013-01-12T12:34:56+08:00</td>
        </tr>
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
                        }
                    };

                    res.render('./admin/plataforma/index.jade', response);

                });
            });

        });
    });

})

module.exports = route;
