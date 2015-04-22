'use strict';

/**
* Module dependencies.
*/
var errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	db = require('../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema;

var Review = schema.Review;
var AuctionReview = schema.AuctionReview;

/**
* Retrieve reviews for item with id itemid
*/
exports.reviews = function(req, res) {
	console.log(req.query);
	var itemid = req.query.itemid;
	Review.findAll({where: {item_id: itemid}}).success(function(reviews){
		console.log(reviews);
		res.jsonp(reviews);
	}).error(function(err){
		res.jsonp(err);
	});
};

/**
* Retrieve reviews for auction item with id auctionid
*/
exports.auctionreviews = function(req, res) {
	var auctionid = req.body.auctionid;
	AuctionReview.findAll({where: {auction_id: auctionid}}).success(function(reviews){
		console.log(reviews);
		res.jsonp(reviews);
	}).error(function(err){
		res.jsonp(err);
	});
};