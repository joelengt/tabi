var express = require('express');
var route = express.Router();

route.get('/', function (req, res) {
	res.render('./plataforma/pricing/index.jade');
});

module.exports = route;
