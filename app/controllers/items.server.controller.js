'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	db = require('../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema;

var Item = schema.Item;

/**
 * Create a Item
 */
exports.create = function(req, res) {
	var item = Item.build(req.body);
	console.log("Inside item create");
	console.log(req.body);
	item.save().success(function() {
		console.log("New item with name: " + item.name);
	}).error(function(err) {
		console.log("Failed to create item: " + item.name);
		res.jsonp(item);
	});
};

/**
 * Show the current Item
 */
exports.read = function(req, res) {
	res.json(req.item);
};

/**
 * Update a Item
 */
exports.update = function(req, res) {
	var item = req.item;

	item = _.extend(item , req.body);

	Item.find({where: {id: item.id}}).success(function(update_item){
		// Update item here
		update_item.updateAttributes(item).then(function(){
			console.log("Updated Item");
		})
	}).error(function(err){
		res.jsonp(err);
	});
	// item.save(function(err) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.jsonp(item);
	// 	}
	// });
};

/**
 * Delete an Item
 */
exports.delete = function(req, res) {
	var item = req.item ;

	// item.remove(function(err) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.jsonp(item);
	// 	}
	// });
};

/**
 * List of Items
 */
exports.list = function(req, res) {
	console.log("Inside list items");
	Item.findAll().success(function(items){
		if(!items) return res.jsonp("{message: No records found}");
		req.items = items;
		res.jsonp(items);
	}).error(function(err){
		res.jsonp(err);
	});
	// Item.find().sort('-created').populate('user', 'displayName').exec(function(err, items) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.jsonp(items);
	// 	}
	// });
};

/**
 * Item middleware
 */
exports.itemByID = function(req, res, next, id) { 
	Item.find({where: {id: id}}).success(function(item){
		if(!item) return next(new Error('Failed to load item ' + id));
		req.item = item;
		next();
	}).error(function(err){
		next(err);
	});
};

/**
 * Item authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.item.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
