'use strict';

/**
 * Module dependencies.
 */
var Sequelize = require('sequelize');
var db = require('../../config/sequelize');
var sequelize = db.sequelize;
var schema = db.schema;

/**
 * Category Schema
 */

var Category = sequelize.define('category', {
	name: Sequelize.STRING,
	description: Sequelize.STRING,
	parent: Sequelize.STRING
});

Category.sync({force: false}).then(function() {
	// These 10 are for set price
	Category.create({
		name: "Tennis",
		description: "Balls flying everywhere",
		parent: "Sports"
	});
	Category.create({
		name: "Computers",
		description: "0's and 1's",
		parent: "Gaming"
	});
	Category.create({
		name: "Videogames",
		description: "I like em how bout you",
		parent: "Gaming"
	});
	Category.create({
		name: "Guns",
		description: "and Ammo too",
		parent: "Activites"
	});
	Category.create({
		name: "Phones",
		description: "bee boop boop",
		parent: "Audio"
	});
	Category.create({
		name: "Shoes",
		description: "for your feet!",
		parent: "Outerwear"
	});
	Category.create({
		name: "Jewelery",
		description: "for your other appendages!",
		parent: "Accesories"
	});
	Category.create({
		name: "Watches",
		description: "for your wrist(s)!",
		parent: "Accesories"
	});
	// These 10 are for Auction
	Category.create({
		name: "Hats",
		description: "for your head!",
		parent: "Outerwear"
	});
	Category.create({
		name: "Canes",
		description: "for walkin'!",
		parent: "Misc"
	});
	Category.create({
		name: "Umbrellas",
		description: "for when it's rainin'!",
		parent: "Misc"
	});
	Category.create({
		name: "Headphones",
		description: "for ya ears!",
		parent: "Audio"
	});
	Category.create({
		name: "Clothes",
		description: "for wearin'!",
		parent: "Outerwear"
	});
	Category.create({
		name: "Golf",
		description: "This is hard!",
		parent: "Sports"
	});
	Category.create({
		name: "Bikes",
		description: "for ridin'!",
		parent: "Sports"
	});
	Category.create({
		name: "Locks",
		description: "for lockin' stuff!",
		parent: "Handyman"
	});
	Category.create({
		name: "Skis",
		description: "for skiiin'!",
		parent: "Sports"
	});
	Category.create({
		name: "Rope",
		description: "for tyin' people - I mean things - up!",
		parent: "Handyman"
	});
	// These are the Root Categories
	Category.create({
		name: "Apparel",
		description: "clothes and other things",
		parent: "NONE"
	});
	Category.create({
		name: "Electronics",
		description: "e-stuff",
		parent: "NONE"
	});
	Category.create({
		name: "Outdoor",
		description: "instead of indoor",
		parent: "NONE"
	});
	Category.create({
		name: "Home Goods",
		description: "that good good",
		parent: "NONE"
	});
	// These are the second level categories
	Category.create({
		name: "Outerwear",
		description: "wear these on the outside",
		parent: "Apparel"
	});
	Category.create({
		name: "Accesories",
		description: "you're only dressed as well as your the quality of your accesories",
		parent: "Apparel"
	});
	Category.create({
		name: "Misc",
		description: "Extraneous stuff here",
		parent: "Apparel"
	});
	Category.create({
		name: "Gaming",
		description: "By gamers for gamers",
		parent: "Electronics"
	});
	Category.create({
		name: "Audio",
		description: "For sound and stuff",
		parent: "Electronics"
	});
	Category.create({
		name: "Sports",
		description: "We like sports",
		parent: "Outdoor"
	});
	Category.create({
		name: "Activites",
		description: "Never enough room for these",
		parent: "Outdoor"
	});
	Category.create({
		name: "Food",
		description: "Nom nom nom",
		parent: "Home Goods"
	});
	Category.create({
		name: "Pets",
		description: "and Ammo too",
		parent: "Home Goods"
	});
	Category.create({
		name: "Handyman",
		description: "A man who is handy is a man who ic cool and also good",
		parent: "Home Goods"
	});
});

 schema['Category'] = Category;
