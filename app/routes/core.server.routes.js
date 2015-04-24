'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	var categories = require('../../app/controllers/categories.server.controller');
	app.route('/').get(core.index);

	app.route('/categories').get(categories.findall);
	app.route('/itemsincats').get(categories.findItemsInCat);
	app.route('/auctionincats').get(categories.findAuctionItemsInCat);
};