'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Onestopshopper Schema
 */
var OnestopshopperSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Onestopshopper name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Onestopshopper', OnestopshopperSchema);