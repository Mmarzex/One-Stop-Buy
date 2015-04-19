'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
	errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	sequelize = db.sequelize,
	schema = db.schema,
	AuctionItem = schema.AuctionItem,
	Category = schema.Category;

/**
 * Create a Auctionitem
 */
exports.create = function(req, res) {
	var auctionitem = AuctionItem.build(req.body);
	auctionitem.buyer_name = req.user.username;
	console.log(auctionitem);

	//Add Category here
	Category.find({where: {name: req.body.category}}).success(function(category){
		if(category !== null) {
			console.log("Category already exists");
			console.log(category);
		} else {
			console.log("Creating new category with name: " + req.body.category);
			var category = Category.create({
				name: req.body.category,
				description: " "
			});

			category.save();
		}
		
	}).error(function(err){
		console.log(err);
		
	})
	// End add category here
	auctionitem.save().success(function(){
		console.log("New Auction item with name:" + auctionitem.name);
		res.json(auctionitem);
	}).error(function(err){
		console.log("Failed to create item with name: " + auctionitem.name);
	});
};

/**
 * Show the current Auctionitem
 */
exports.read = function(req, res) {
	res.jsonp(req.auctionitem);
};

/**
 * Update a Auctionitem
 */
exports.update = function(req, res) {
	var auctionitem = req.auctionitem;

	// auctionitem = _.extend(auctionitem , req.body);
	console.log("Inside updates");
	console.log(auctionitem);
	AuctionItem.find({where: {id: auctionitem.id}}).success(function(update_item){
		update_item.updateAttributes(auctionitem).success(function(a){
			console.log("Updated item");
			return res.jsonp(a);
		}).error(function(err){
			console.log("Did not update item");
			return res.jsonp(err);
		})
	}).error(function(err){
		console.log("Could not find item");
		res.jsonp(err);
	});
};

exports.bid = function(req, res) {
	var auctionitem = req.auctionitem;
	console.log("Bidding on===> " + auctionitem.name);
	auctionitem.updateAttributes({
		current_bid: req.body.current_bid,
		buyer_name: req.user.username
	}).success(function(a){
		a.save();
		return res.jsonp(a);
	}).error(function(err){
		return res.jsonp(err);
	});
}

/**
 * Delete an Auctionitem
 */
exports.delete = function(req, res) {
	console.log("Inside delete");
	var auctionitem = req.auctionitem;

	auctionitem.destroy().success(function(){
		return res.jsonp(auctionitem);
	}).error(function(err){
		return res.jsonp(err);
	});
};

/**
 * List of Auctionitems
 */
exports.list = function(req, res) { 
	AuctionItem.findAll().success(function(auctionitems){
		if(!auctionitems) return res.jsonp("{message: No records found}");
		req.auctionitems = auctionitems;
		res.jsonp(auctionitems);
	}).error(function(err){
		res.jsonp(err);
	});
};

/**
 * Auctionitem middleware
 */
exports.auctionitemByID = function(req, res, next, id) { 
	AuctionItem.find({where: {id: id}}).success(function(auctionitem){
		if(!auctionitem) return next(new Error('Failed to load auctionitem ' + id));
		req.auctionitem = auctionitem;
		next();
	}).error(function(err){
		next(err);
	});
};

/**
 * Auctionitem authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	// if (req.auctionitem.buyer_name !== req.user.username) {
	// 	return res.status(403).send('User is not authorized');
	// }
	next();
};
