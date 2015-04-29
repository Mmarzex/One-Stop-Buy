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

Review.sync({force: false}).then(function() {
	// Review.create({
	// 	poster: "max",
	// 	item_id: 1,
	// 	text: "BULLSHIT",
	// 	post_date: Date.now()
	// });
	// Review.create({
	// 	poster: "max",
	// 	item_id: 1,
	// 	text: "asdfasdfasdfasdf",
	// 	post_date: Date.now()
	// });

	// Review.create({
	// 	poster: "max",
	// 	text: "I love this item. Literally the best thing I've ever bought!",
	// 	post_date: Date.now()
	// });

	// Review.create({
	// 	poster: "brad",
	// 	text: "This item is terrible. I wanted it to literally do everything in my life and it didn't. 0/10 would not buy again!",
	// 	post_date: Date.now()
	// });

	// Review.create({
	// 	poster: "joe",
	// 	text: "I bought this thinking it would make my life better. My life is the same, 0/10",
	// 	post_date: Date.now()
	// });
});

schema['Review'] = Review;