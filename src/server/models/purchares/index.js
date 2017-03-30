var mongoose = require('mongoose')
var Schema = mongoose.Schema

var purchase = new Schema({
    cotizator: {
        origen:        { type: String },
        destino:       { type: String },
        tipo_viaje:    { type: String },
        salida:        { type: String },
        regreso:       { type: String },
        dias:          { type: String },
        pasajero:      { type: String },
        adulto_mayor:  { type: String },
        promocion:     { type: String },
        email:         { type: String },
    },
    pack_selected: {
        title:  { type: String },
        dias:   { type: String },
        tarifa: { type: String }
    },
    account: {
        names:         { type: String },
        last_names:    { type: String },
        full_name:     { type: String },
        photo:         {},
        dni:           { type: String },
        email:         { type: String },
        // username:      { type: String, unique: true},
        password:      { type: String },
        permiso:       { type: String },
        token_auth:    { type: String },
        status_purchare: { type: String },
        fecha_creada:  { type: Date, default: Date.now }
    }
})

var purchases = mongoose.model('users', purchase)

module.exports = purchases;
