'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var onestopshoppers = require('../../app/controllers/onestopshoppers.server.controller');

	// Onestopshoppers Routes
	app.route('/onestopshoppers')
		.get(onestopshoppers.list)
		.post(users.requiresLogin, onestopshoppers.create);

	app.route('/onestopshoppers/:onestopshopperId')
		.get(onestopshoppers.read)
		.put(users.requiresLogin, onestopshoppers.hasAuthorization, onestopshoppers.update)
		.delete(users.requiresLogin, onestopshoppers.hasAuthorization, onestopshoppers.delete);

	// Finish by binding the Onestopshopper middleware
	app.param('onestopshopperId', onestopshoppers.onestopshopperByID);
};
