'use strict';

/**
* Module Dependencies.
*/
var errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	db = require('../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema,
	Item = schema.Item,
	AuctionItem = schema.AuctionItem;

// User stuff
var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.getLowStock = function(req, res) {

	Item.findAll({where: ["stock < ?", 5] }).then(function(items){
		res.jsonp(items);
	});
};

exports.getFinishedAuction = function(req, res) {

	AuctionItem.findAll({where: {auction_ended: true}}).then(function(auctionitems){
		res.jsonp(auctionitems);
	});
};

exports.getUserReport = function(req, res) {

	User.find().select('name address email phone annualIncome gender').exec(function(err, users){
		res.jsonp(users);
		// users.select('name address email phone gender annualIncome').exec(function (err, fusers){
		// 	res.jsonp(fusers);
		// });
	});
};

exports.auctionSearch = function(req, res) {

	var term = req.query.searchterm;

	AuctionItem.findAll({where: {name: {like: '%' + term + '%'}}}).success(function(auctionitems){
		console.log("Results of search");
		console.log(auctionitems);
		// res.search = auctionitems;
		res.jsonp(auctionitems);
	}).error(function(err){
		res.jsonp(err);
	});
};

exports.itemSearch = function(req, res) {

	var term = req.query.searchterm;

	Item.findAll({where: {name: {like: '%' + term + '%'}}}).success(function(items){
		console.log(items);
		res.jsonp(items);
	}).error(function(err){
		res.jsonp(err);
	});
};

exports.featuredItems = function(req, res) {

	Item.findAll({limit: 4}).then(function(items){
		res.jsonp(items);
	})
}

exports.featuredAuctions = function(req, res) {

	AuctionItem.findAll({limit: 4}).then(function(auctions){
		res.jsonp(auctions);
	})
}