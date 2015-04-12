var fs = require('fs'),
	path = require('path'),
	Sequelize = require('sequelize'),
	_ = require('lodash'),
	config = require('./config');

var schema = {};
var sequelize_config = {};

var sequelize = new Sequelize(config.sqldb.name, config.sqldb.username, config.sqldb.password, {
	dialect: 'mysql',
});

module.exports = _.extend({
	sequelize: sequelize,
	Sequelize: Sequelize,
	schema: schema
}, sequelize_config);