'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Catbrowse = mongoose.model('Catbrowse');

var errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	db = require('../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema;

var AuctionItem = schema.AuctionItem;
var Category = schema.Category;

exports.getItemsInCat = function(req, res) {
	var cat = req.query.cat;

}

/**
 * Create a Catbrowse
 */
exports.create = function(req, res) {
	var catbrowse = new Catbrowse(req.body);
	catbrowse.user = req.user;

	catbrowse.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(catbrowse);
		}
	});
};

/**
 * Show the current Catbrowse
 */
exports.read = function(req, res) {
	res.jsonp(req.catbrowse);
};

/**
 * Update a Catbrowse
 */
exports.update = function(req, res) {
	var catbrowse = req.catbrowse ;

	catbrowse = _.extend(catbrowse , req.body);

	catbrowse.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(catbrowse);
		}
	});
};

/**
 * Delete an Catbrowse
 */
exports.delete = function(req, res) {
	var catbrowse = req.catbrowse ;

	catbrowse.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(catbrowse);
		}
	});
};

/**
 * List of Catbrowses
 */
exports.list = function(req, res) { 
	Catbrowse.find().sort('-created').populate('user', 'displayName').exec(function(err, catbrowses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(catbrowses);
		}
	});
};

/**
 * Catbrowse middleware
 */
exports.catbrowseByID = function(req, res, next, id) { 
	Category.find({where: {name: id}}).success(function(category){
		req.catbrowse = category;
		next();
	}).error(function(err){
		next(err);
	});
};

/**
 * Catbrowse authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.catbrowse.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
