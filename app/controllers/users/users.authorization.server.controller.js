'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

var db = require('../../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema,
	OneStopShopper = schema.OneStopShopper;

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};

/**
* Check for if user is OneStopShopper
**/
exports.isOnestopshopper = function(req, res) {
	var username = req.user.username;
	OneStopShopper.find({where: {username: username}}).success(function(onestopshopper){
		if(!onestopshopper) return new Error('User is not a onestopshopper');
		return res.jsonp("{message: User is a OneStopShopper}");
	}).error(function(err){
		res.jsonp(err);
	});
}