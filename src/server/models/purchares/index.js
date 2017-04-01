var mongoose = require('mongoose')
var Schema = mongoose.Schema

var purchase = new Schema({
    cotizator: {
        origen:        { type: String, default: '' },
        destino:       { type: String, default: '' },
        tipo_viaje:    { type: String, default: '' },
        salida:        { type: String, default: '' },
        regreso:       { type: String, default: '' },
        dias:          { type: String, default: '' },
        pasajero:      { type: String, default: '' },
        adulto_mayor:  { type: String, default: '' },
        promocion:     { type: String, default: '' },
        email:         { type: String, default: ''},
    },
    pack_selected: {
        title:  { type: String, default: '' },
        dias:   { type: String, default: '' },
        tarifa: { type: String, default: '' }
    },
    account: {
        names:         { type: String, default: '' },
        last_names:    { type: String, default: '' },
        full_name:     { type: String, default: '' },
        photo:         {},
        tipo_doc:      { type: String, default: '' },
        doc_number:    { type: String, default: '' },
        email:         { type: String, default: 'joelengt@gmail.com' },
        // username:      { type: String, unique: true},
        domicilio:     { type: String, default: '' },
        password:      { type: String, default: '' },
        permiso:       { type: String, default: '' },
        ciudad:      { type: String , default: 'Lima'},
        address:     { type: String , default: 'av Lima'},
        phone:       { type: String , default: '999999999'},
        contact_emergencia: {
            nombres:   { type: String, default: '' },
            apellidos: { type: String, default: '' },
            telefono:  { type: String, default: '' },
            email:     { type: String, default: '' }
        },
        token_auth:    { type: String, default: '' },
        status_purchare: { type: String , default: 'nothing'},
        fecha_creada:  { type: Date, default: Date.now }
    },
    access:     { type: String, default: 'normal' }
})

var purchases = mongoose.model('users', purchase)

module.exports = purchases;
