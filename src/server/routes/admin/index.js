var express = require('express');
var route = express.Router();

var namingListController = require('../../controllers/NamingListController/index.js');
var NamingListController = new namingListController();

route.get('/list', NamingListController.list);
route.get('/get-info', NamingListController.getInfo);

module.exports = route;
