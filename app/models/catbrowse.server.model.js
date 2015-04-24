'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Catbrowse Schema
 */
var CatbrowseSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Catbrowse name',
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

mongoose.model('Catbrowse', CatbrowseSchema);