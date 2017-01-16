//Modulos y Dependencias
var express = require('express');
var app = express();
var server = require('http').Server(app);

var mongoose = require('mongoose');
var passport = require('passport');
var multer = require('multer');

var path = require('path');
var logger = require('morgan');
var favicon  =require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');

// configuración para correar el servidor
var config = require('../../config/index.js');

// Prevenir error y mostrar primero en la consola
process.on('uncaughtException', function(err) {
    console.log(err);
});

//Conexión con Mongodb
mongoose.connect(config.server.db.mongodb.local, function (err) {
    if(err) {
        return console.log('Error al connectar database: ' + err);
    }
    console.log('Exito base de datos connectada');
})

// middlawares
function middleware (req, res, next) {
  return next();
}

// Configuración del servidor
app.set('port', config.server.port || process.env.PORT);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../uploads')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(flash());


// Session timer estimate Limite: 30 días
app.use(session({ secret: 'usuarioSession', cookie: { maxAge: 15 * 24 * 60 * 60 * 1000 }}));

//app.use(session({ secret: 'usuarioSession'));
app.use(multer({dest: './uploads/news/'}));

// Middlewares de passport para login
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
var routes = require('./routes/index.js')(app);

// Error 404
app.use(function (req, res) {
    res.statusCode = 404;
    res.send('Error 404: Pagina No Encontrada');
})

// Error 500
app.use(function (req, res) {
    res.statusCode = 500;
    res.send('Error 500: Error del Servidor, Porfavor intentelo más tarde');
})

//Start server
server.listen(app.set('port'), function (err) {
    if(err) {
        return console.log('Error al iniciar server en el puerto: ' + err);
    }

    console.log(`Server ==> ${ config.server.env } start on port: ${ app.set('port') }`);
})
