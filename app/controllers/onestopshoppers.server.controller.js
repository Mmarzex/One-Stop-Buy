'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
	errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	sequelize = db.sequelize,
	schema = db.schema,
	OneStopShopper = schema.OneStopShopper;

/**
 * Create a Onestopshopper
 */
exports.create = function(req, res) {
	// var onestopshopper = OneStopShopper.create({
	// 	username: req.user.username,
	// 	startDate: new Date(),
	// 	endDate: new Date() + 1
	// });
	var onestopshopper = OneStopShopper.build(req.body);
	onestopshopper.username = req.user.username;
	onestopshopper.startDate = new Date();
	onestopshopper.endDate = new Date();
	onestopshopper.save().success(function(){
		console.log("New onestopshopper subscription for: " + onestopshopper.username);
		res.jsonp(onestopshopper);
	}).error(function(err){
		res.jsonp(err);
	})
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
	// var onestopshopper = req.onestopshopper ;

	// onestopshopper = _.extend(onestopshopper , req.body);

	// onestopshopper.save(function(err) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.jsonp(onestopshopper);
	// 	}
	// });
};

/**
 * Delete an Onestopshopper
 */
exports.delete = function(req, res) {
	// var onestopshopper = req.onestopshopper ;

	// OneStopShopper.remove(function(err) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.jsonp(onestopshopper);
	// 	}
	// });
};

/**
 * List of Onestopshoppers
 */
exports.list = function(req, res) { 
	// OneStopShopper.find().sort('-created').populate('user', 'displayName').exec(function(err, onestopshoppers) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.jsonp(onestopshoppers);
	// 	}
	// });
};

/**
 * Onestopshopper middleware
 */
exports.onestopshopperByID = function(req, res, next, id) { 
	OneStopShopper.find({where: {id: id}}).success(function(onestopshopper){
		if(!onestopshopper) return next(new Error('Failed to load onestop shopper with id ' + id));
		req.onestopshopper = onestopshopper;
		next();
	}).error(function(err) {
		next(err);
	});
};

/**
 * Onestopshopper authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.onestopshopper.username !== req.user.username) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
