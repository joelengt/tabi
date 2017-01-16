var config = require('../../../../config/index.js');

var AgentMySQL = require('sqlagent/mysql').connect(config.server.db.mysql.local);
var MySQL = new AgentMySQL();

module.exports = MySQL;