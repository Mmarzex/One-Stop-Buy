'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Catbrowseauc Schema
 */
var CatbrowseaucSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Catbrowseauc name',
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

mongoose.model('Catbrowseauc', CatbrowseaucSchema);