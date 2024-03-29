'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var items = require('../../app/controllers/items.server.controller');
	var reviews = require('../../app/controllers/reviews.server.controller');
	// Items Routes
	app.route('/items')
		.get(items.list)
		.post(users.requiresLogin, items.create);

	app.route('/items/:itemId')
		.get(items.read)
		.put(users.requiresLogin, items.buy)
		.delete(users.requiresLogin, items.hasAuthorization, items.delete);

	app.route('/itemreview')
		.get(reviews.reviews);
	// Finish by binding the Item middleware 
	app.param('itemId', items.itemByID);
};
