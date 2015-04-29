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
	// AuctionReview.create({
	// 	poster: "max",
	// 	auction_id: 1,
	// 	text: "BULLSHIT",
	// 	post_date: Date.now()
	// });
	// AuctionReview.create({
	// 	poster: "max",
	// 	auction_id: 1,
	// 	text: "asdfasdfasdfasdf",
	// 	post_date: Date.now()
	// });
	// AuctionReview.create({
	// 	poster: "max",
	// 	text: "This was awesome! I love this item!",
	// 	post_date: Date.now()
	// });
	// AuctionReview.create({
	// 	poster: "brad",
	// 	text: "I didn't win this auction, I hate this item!",
	// 	post_date: Date.now()
	// });
	// AuctionReview.create({
	// 	poster: "neil",
	// 	text: "When I got this item it was just a box with rocks in it. I love rocks!",
	// 	post_date: Date.now()
	// })
});

schema['AuctionReview'] = AuctionReview;