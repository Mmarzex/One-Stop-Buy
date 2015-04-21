'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var auctionitems = require('../../app/controllers/auctionitems.server.controller');
	var reviews = require('../../app/controllers/reviews.server.controller');

	// Auctionitems Routes
	app.route('/auctionitems')
		.get(auctionitems.list)
		.post(users.requiresLogin, auctionitems.create);
	app.route('/asearch')
		.get(auctionitems.search);
	app.route('/auctionitems/:auctionitemId')
		.get(auctionitems.read)
		.put(users.requiresLogin, auctionitems.bid)
		.delete(auctionitems.delete);
	app.route('/auctionreview')
		.get(reviews.auctionreviews);

	// Finish by binding the Auctionitem middleware
	app.param('auctionitemId', auctionitems.auctionitemByID);
};
