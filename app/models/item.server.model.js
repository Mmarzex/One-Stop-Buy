'use strict';

/**
 * Module dependencies.
 */

var Sequelize = require('sequelize');
var db = require('../../config/sequelize');
var sequelize = db.sequelize;
var schema = db.schema;

// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema;


var Item = sequelize.define('item', {
	name: Sequelize.STRING,
	description: Sequelize.STRING,
	location: Sequelize.STRING,
	stock: Sequelize.INTEGER,
	price: Sequelize.FLOAT,
	creator: Sequelize.STRING,
	image: Sequelize.STRING
});

Item.sync({force: true}).then(function() {
	return Item.create({
		name: "Male Enhancement Drugs",
		description: "Five inches in Five Days",
		location: "Your mom's house",
		stock: 10,
		price: 69.69,
		creator: "asdf",
		image: "asdf.png"
	});
});

schema['Item'] = Item;

// /**
//  * Item Schema
//  */
// var ItemSchema = new Schema({
// 	name: {
// 		type: String,
// 		default: '',
// 		required: 'Please fill Item name',
// 		trim: true
// 	},
// 	created: {
// 		type: Date,
// 		default: Date.now
// 	},
// 	user: {
// 		type: Schema.ObjectId,
// 		ref: 'User'
// 	}
// });

// mongoose.model('Item', ItemSchema);