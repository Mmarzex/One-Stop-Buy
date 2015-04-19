'use strict';

/**
 * Module dependencies.
 */
var Sequelize = require('sequelize'),
	db = require('../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema;

/**
 * Onestopshopper Schema
 */
var OneStopShopper = sequelize.define('onestopshopper', {
	username: Sequelize.STRING,
	startDate: Sequelize.DATE,
	renewDate: Sequelize.DATE
});


OneStopShopper.sync({force: true}).then(function() {
	console.log("OneStopShopper Schema Synced to database");
});

schema['OneStopShopper'] = OneStopShopper;