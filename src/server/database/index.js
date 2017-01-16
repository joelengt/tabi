var config = require('../../../config/index.js');

// Conexion MySQL
var AgentMySQL = require('sqlagent/mysql').connect(config.server.db.mysql.local);
var MySQL = new AgentMySQL();

// Conexion PostgreSQL
var AgentPostgreSQL = require('sqlagent/pg').connect(config.server.db.postgresql.local);
var PostgreSQL = new AgentPostgreSQL();

module.exports = {
    'MySQL': MySQL,
    'PostgreSQL': PostgreSQL
};