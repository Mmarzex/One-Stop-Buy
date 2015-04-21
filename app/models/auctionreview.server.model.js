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

AuctionReview.sync({force: true}).then(function() {

});

schema['AuctionReview'] = AuctionReview;