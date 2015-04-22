'use strict';

/** 
* Module Dependencies.
*/
var errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	db = require('../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema,
	Category = schema.Category;

exports.findall = function(req, res) {
	Category.findAll().success(function(categories) {
		req.categories = categories;
		res.jsonp(categories);
	}).error(function(err) {
		res.jsonp(err);
	});
};