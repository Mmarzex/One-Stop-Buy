'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Catbrowseauc = mongoose.model('Catbrowseauc');

var errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	db = require('../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema;

var Item = schema.Item;
var Category = schema.Category;

/**
 * Create a Catbrowseauc
 */
exports.create = function(req, res) {
	var catbrowseauc = new Catbrowseauc(req.body);
	catbrowseauc.user = req.user;

	catbrowseauc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(catbrowseauc);
		}
	});
};

/**
 * Show the current Catbrowseauc
 */
exports.read = function(req, res) {
	res.jsonp(req.catbrowseauc);
};

/**
 * Update a Catbrowseauc
 */
exports.update = function(req, res) {
	var catbrowseauc = req.catbrowseauc ;

	catbrowseauc = _.extend(catbrowseauc , req.body);

	catbrowseauc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(catbrowseauc);
		}
	});
};

/**
 * Delete an Catbrowseauc
 */
exports.delete = function(req, res) {
	var catbrowseauc = req.catbrowseauc ;

	catbrowseauc.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(catbrowseauc);
		}
	});
};

/**
 * List of Catbrowseaucs
 */
exports.list = function(req, res) { 
	Catbrowseauc.find().sort('-created').populate('user', 'displayName').exec(function(err, catbrowseaucs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(catbrowseaucs);
		}
	});
};

/**
 * Catbrowseauc middleware
 */
exports.catbrowseaucByID = function(req, res, next, id) {
 	Category.find({where: {name: id}}).success(function(category){
		req.catbrowseauc= category;
		next();
	}).error(function(err){
		next(err);
	});
};

/**
 * Catbrowseauc authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.catbrowseauc.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
