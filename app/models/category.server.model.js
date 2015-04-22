'use strict';

/**
 * Module dependencies.
 */
var Sequelize = require('sequelize');
var db = require('../../config/sequelize');
var sequelize = db.sequelize;
var schema = db.schema;

/**
 * Category Schema
 */

var Category = sequelize.define('category', {
	name: Sequelize.STRING,
	description: Sequelize.STRING,
	parent: Sequelize.STRING
});

Category.sync({force: false}).then(function() {
	Category.create({
		name: "Tennis",
		description: "Balls flying everywhere",
		parent: "NONE"
	});
	Category.create({
		name: "Computers",
		description: "0's and 1's",
		parent: "NONE"
	});
	Category.create({
		name: "Food",
		description: "For all the food needs",
		parent: "NONE"
	});
	Category.create({
		name: "Health",
		description: "All health good",
		parent: "NONE"
	});
	Category.create({
		name: "Misc",
		description: "Who knows what you need",
		parent: "NONE"
	});
});

 schema['Category'] = Category;
