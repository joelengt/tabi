var express = require('express');
var route = express.Router();

var userController = require('../../../controllers/UserController/index.js');
var UserController = new userController();

route.get('/list', UserController.list);
route.get('/item/:id', UserController.item);
route.get('/create', UserController.create);
route.get('/update/:id', UserController.update);
route.get('/delete/:id', UserController.delete);

module.exports = route;
