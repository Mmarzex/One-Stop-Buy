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
var Bought = schema.Bought;

/**
 * Create a Item
 */
exports.create = function(req, res) {
	var item = Item.build(req.body);
	// console.log("Inside item create");
	// console.log(req.body);
	item.creator = req.user.username;
	item.save().success(function() {
		console.log("New item with name: " + item.name);
		res.jsonp(item);
	}).error(function(err) {
		console.log("Failed to create item: " + item.name);
		res.jsonp(err);
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
	console.log("Inside update");
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
};

/**
** Buy an Item
*/
exports.buy = function(req, res) {
	var item = req.item;
	var newStock = item.stock;
	if(newStock > 0) {
		newStock--;
	}
	item.updateAttributes({
		stock: newStock
	}).success(function(a){
		a.save();
		console.log("Stock of item " + item.name + " is now " + item.stock);
		var bought = Bought.build(req.body);
		bought.buyer_name = req.user.username;
		bought.item_name = item.name;
		bought.item_id = item.id;
		bought.auction_item = false;
		bought.save().success(function() { console.log("Item bought!")}).error(function(err){ console.log(err); });
		return res.jsonp(a);
	}).error(function(err){
		return res.jsonp(err);
	});
}

/**
 * Delete an Item
 */
exports.delete = function(req, res) {
	var item = req.item ;
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
	// if (req.item.user.id !== req.user.id) {
	// 	return res.status(403).send('User is not authorized');
	// }
	next();
};
