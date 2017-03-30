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
        tipo_doc:      { type: String },
        doc_number:    { type: String },
        email:         { type: String, default: 'joelengt@gmail.com' },
        // username:      { type: String, unique: true},
        domicilio:     { type: String },
        password:      { type: String },
        permiso:       { type: String },
        ciudad:      { type: String , default: 'Lima'},
        address:     { type: String , default: 'av Lima'},
        phone:       { type: String , default: '999999999'},
        contact_emergencia: {
            nombres:   { type: String },
            apellidos: { type: String },
            telefono:  { type: String },
            email:     { type: String }
        },
        token_auth:    { type: String },
        status_purchare: { type: String , default: 'nothing'},
        fecha_creada:  { type: Date, default: Date.now }
    },
    access:     { type: String, default: 'normal' }
})

var purchases = mongoose.model('users', purchase)

module.exports = purchases;
