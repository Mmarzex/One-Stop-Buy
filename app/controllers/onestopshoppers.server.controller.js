'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Onestopshopper = mongoose.model('Onestopshopper'),
	_ = require('lodash');

/**
 * Create a Onestopshopper
 */
exports.create = function(req, res) {
	var onestopshopper = new Onestopshopper(req.body);
	onestopshopper.user = req.user;

	onestopshopper.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(onestopshopper);
		}
	});
};

/**
 * Show the current Onestopshopper
 */
exports.read = function(req, res) {
	res.jsonp(req.onestopshopper);
};

/**
 * Update a Onestopshopper
 */
exports.update = function(req, res) {
	var onestopshopper = req.onestopshopper ;

	onestopshopper = _.extend(onestopshopper , req.body);

	onestopshopper.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(onestopshopper);
		}
	});
};

/**
 * Delete an Onestopshopper
 */
exports.delete = function(req, res) {
	var onestopshopper = req.onestopshopper ;

	onestopshopper.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(onestopshopper);
		}
	});
};

/**
 * List of Onestopshoppers
 */
exports.list = function(req, res) { 
	Onestopshopper.find().sort('-created').populate('user', 'displayName').exec(function(err, onestopshoppers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(onestopshoppers);
		}
	});
};

/**
 * Onestopshopper middleware
 */
exports.onestopshopperByID = function(req, res, next, id) { 
	Onestopshopper.findById(id).populate('user', 'displayName').exec(function(err, onestopshopper) {
		if (err) return next(err);
		if (! onestopshopper) return next(new Error('Failed to load Onestopshopper ' + id));
		req.onestopshopper = onestopshopper ;
		next();
	});
};

/**
 * Onestopshopper authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.onestopshopper.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
