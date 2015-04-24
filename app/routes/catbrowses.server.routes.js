'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var catbrowses = require('../../app/controllers/catbrowses.server.controller');

	// Catbrowses Routes
	app.route('/catbrowses')
		.get(catbrowses.list)
		.post(users.requiresLogin, catbrowses.create);

	app.route('/catbrowses/:catbrowseId')
		.get(catbrowses.read)
		.put(users.requiresLogin, catbrowses.hasAuthorization, catbrowses.update)
		.delete(users.requiresLogin, catbrowses.hasAuthorization, catbrowses.delete);

	// Finish by binding the Catbrowse middleware
	app.param('catbrowseId', catbrowses.catbrowseByID);
};
