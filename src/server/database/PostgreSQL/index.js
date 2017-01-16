var config = require('../../../../config/index.js');

var AgentPostgreSQL = require('sqlagent/pg').connect(config.server.db.postgresql.local);
var PostgreSQL = new AgentPostgreSQL();

module.exports = PostgreSQL;