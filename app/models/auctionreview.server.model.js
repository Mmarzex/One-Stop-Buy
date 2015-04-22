'use strict';

/**
* Module dependencies
*/
var Sequelize = require('sequelize'),
	db = require('../../config/sequelize'),
	sequelize = db.sequelize,
	schema = db.schema;

/**
* Review Schema
*/

var AuctionReview = sequelize.define('auctionreview', {
	poster: Sequelize.STRING,
	auction_id: Sequelize.INTEGER,
	text: Sequelize.STRING,
	post_date: Sequelize.DATE
});

AuctionReview.sync({force: false}).then(function() {
	AuctionReview.create({
		poster: "max",
		auction_id: 1,
		text: "BULLSHIT",
		post_date: Date.now()
	});
	AuctionReview.create({
		poster: "max",
		auction_id: 1,
		text: "asdfasdfasdfasdf",
		post_date: Date.now()
	});
});

schema['AuctionReview'] = AuctionReview;