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
 	buyer_name: Sequelize.STRING,
 	current_bid: Sequelize.FLOAT,
 	buy_it_now: Sequelize.FLOAT,
 	reserve_price: Sequelize.FLOAT
});

 AuctionItem.sync({force: true}).then(function() {
 	return AuctionItem.create({
 		name: "Three-Foot Dick",
 		description: "Sprinkled With Elvis Dust",
 		location: "Your mom's house",
 		buyer_name: "max",
 		current_bid: 0.0,
 		buy_it_now: 69.69,
 		reserve_price: 69.69
 	});
 });

 schema['AuctionItem'] = AuctionItem;
