var express = require('express');
var route = express.Router();

var generadorDescuentoController = require('../../controllers/GeneradorDescuento/index.js');
var GeneradorDescuento = new generadorDescuentoController();

route.get('/generator-list', GeneradorDescuento.list);
route.get('/generator-/get/:id', GeneradorDescuento.get);
route.get('/generator-/create', GeneradorDescuento.create);
route.get('/generator-/delete/:id', GeneradorDescuento.delete);

module.exports = route;
