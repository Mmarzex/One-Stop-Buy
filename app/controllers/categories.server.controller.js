'use strict';

/** 
* Module Dependencies.
*/
var errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	db = require('../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema,
	Category = schema.Category,
	Item = schema.Item,
	AuctionItem = schema.AuctionItem;

exports.findall = function(req, res) {
	Category.findAll().success(function(categories) {
		req.categories = categories;
		res.jsonp(categories);
	}).error(function(err) {
		res.jsonp(err);
	});
};

var rootCats = ["Home Goods", "Electronics", "Outdoor", "Apparel"];

exports.findItemsInCat = function(req, res) {
	
	var category = req.query.cat;
	Category.find({where: {name: category}}).success(function(cat){
		var cat_name = category;
		var cat_parent = cat.parent;
		Item.findAll({where: {category: cat_name}}).success(function(items_one){
			Item.findAll({where: {category: cat_parent}}).success(function(items_two){
				console.log(items_one);
				res.jsonp(items_one.concat(items_two));
			}).error(function(err){
				res.jsonp(err);
			});
		}).error(function(err){
			res.jsonp(err);
		});
	}).error(function(err){
		res.jsonp(err);
	});
};

exports.findItems = function(req, res) {

	var category = req.query.cat;
	Category.find({where: {name: category}}).success(function(cat){
		var cat_parent = cat.parent;
		var cat_child = cat.child;
		
		// Top Level Case
		if(cat_parent === "NULL") {

		} else if(rootCats.indexOf(cat_parent) !== -1) {

		} else {
			
		}
	})
}

exports.findAuctionItemsInCat = function(req, res) {
	
	var category = req.query.cat;
	Category.find({where: {name: category}}).success(function(cat){
		var cat_name = category;
		var cat_parent = cat.parent;
		AuctionItem.findAll({where: {category: cat_name}}).success(function(auctions_one){
			AuctionItem.findAll({where: {category: cat_parent}}).success(function(auctions_two){
				console.log(auctions_one);
				res.jsonp(auctions_one.concat(auctions_two));
			}).error(function(err){
				res.jsonp(err);
			});
		}).error(function(err){
			res.jsonp(err);
		});
	}).error(function(err){
		res.jsonp(err);
	});
};