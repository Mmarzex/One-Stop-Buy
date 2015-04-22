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

var Review = sequelize.define('review', {
	poster: Sequelize.STRING,
	item_id: Sequelize.INTEGER,
	text: Sequelize.STRING,
	post_date: Sequelize.DATE
});

Review.sync({force: true}).then(function() {
	Review.create({
		poster: "max",
		item_id: 1,
		text: "BULLSHIT",
		post_date: Date.now()
	});
	Review.create({
		poster: "max",
		item_id: 1,
		text: "asdfasdfasdfasdf",
		post_date: Date.now()
	});
});

schema['Review'] = Review;