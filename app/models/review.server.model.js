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

});

schema['Review'] = Review;