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
	description: Sequelize.STRING
// },
// {
// 	associate: function(models) {
// 		Category.hasMany(Category, {as: 'Children', foreignKey: 'ParentId', through: null});
// 	}
});

Category.sync({force: true}).then(function() {
	Category.create({
		name: "Tennis",
		description: "Balls flying everywhere"
	});
	Category.create({
		name: "Computers",
		description: "0's and 1's"
	});
	Category.create({
		name: "Food",
		description: "For all the food needs"
	});
	Category.create({
		name: "Health",
		description: "All health good"
	});
	Category.create({
		name: "Misc",
		description: "Who knows what you need"
	});
});

 schema['Category'] = Category;
