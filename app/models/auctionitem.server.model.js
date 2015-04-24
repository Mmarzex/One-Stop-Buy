'use strict';

/**
 * Module dependencies.
 */
var Sequelize = require('sequelize');
var db = require('../../config/sequelize');
var sequelize = db.sequelize;
var schema = db.schema;

/**
 * Auctionitem Schema
 */

 var AuctionItem = sequelize.define('auctionitem', {
 	name: Sequelize.STRING,
 	description: Sequelize.STRING,
 	location: Sequelize.STRING,
 	poster_name: Sequelize.STRING,
 	buyer_name: Sequelize.STRING,
 	current_bid: Sequelize.FLOAT,
 	buy_it_now: Sequelize.FLOAT,
 	reserve_price: Sequelize.FLOAT,
 	image: Sequelize.STRING,
 	category: Sequelize.STRING,
 	auction_ended: Sequelize.BOOLEAN
// },
// {
// 	associate: function(models) {
// 		AuctionItem.belongsTo(models.Category);
// 	}
});

 AuctionItem.sync({force: false}).then(function() {
 	// return AuctionItem.create({
 	// 	name: "Three-Foot Dick",
 	// 	description: "Sprinkled With Elvis Dust",
 	// 	location: "Your mom's house",
 	// 	poster_name: "Your mom",
 	// 	buyer_name: "max",
 	// 	current_bid: 0.0,
 	// 	buy_it_now: 69.69,
 	// 	reserve_price: 69.69,
 	// 	image: "http://i.imgur.com/6XAJI6V.jpg",
 	// 	auction_ended: true
 	// });
 });

 schema['AuctionItem'] = AuctionItem;
