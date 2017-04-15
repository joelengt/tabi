var mongoose = require('mongoose');
var cuponSchema = mongoose.Schema;

var cupon = new cuponSchema({
    title:            { type: String },
    numero_descuento: { type: String },
    fecha_creada:     { type: Date, default: Date.now }
});

var cupones = mongoose.model('cupones', cupon);

module.exports = cupones;