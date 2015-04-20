'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
* Sequelize Dependiences
*/
var db = require('../../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema,
	Bought = schema.Bought;
	
/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};

/**
* Get User's Orders
*/
exports.orders = function(req, res) {
	console.log("ORDERSASDFGHJKJHGF");
	var username = req.user.username;
	Bought.findAll({where: {buyer_name: username}}).success(function(boughtItems){
		if(!boughtItems) return res.jsonp("{message: No order nothing}");
		console.log("Inside orders");
		console.log(boughtItems);
		req.orders = boughtItems;
		res.jsonp(boughtItems);
	}).error(function(err){
		res.jsonp(err);
	});
};