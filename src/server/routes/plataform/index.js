var express = require('express');
var route = express.Router();

route.post('/', function (req, res) {
	res.render('./plataforma/pricing/index.jade');
});

module.exports = route;
