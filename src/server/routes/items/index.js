var express = require('express');
var route = express.Router();

var itemsController = require('../../controllers/ItemsController/index.js');
var ItemsController = new itemsController();

route.get('/list', ItemsController.list);
route.get('/get-info', ItemsController.getInfo);

module.exports = route;
