'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var auctionitems = require('../../app/controllers/auctionitems.server.controller');

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
	

	// Finish by binding the Auctionitem middleware
	app.param('auctionitemId', auctionitems.auctionitemByID);
};
