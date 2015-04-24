'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var catbrowseaucs = require('../../app/controllers/catbrowseaucs.server.controller');

	// Catbrowseaucs Routes
	app.route('/catbrowseaucs')
		.get(catbrowseaucs.list)
		.post(users.requiresLogin, catbrowseaucs.create);

	app.route('/catbrowseaucs/:catbrowseaucId')
		.get(catbrowseaucs.read)
		.put(users.requiresLogin, catbrowseaucs.hasAuthorization, catbrowseaucs.update)
		.delete(users.requiresLogin, catbrowseaucs.hasAuthorization, catbrowseaucs.delete);

	// Finish by binding the Catbrowseauc middleware
	app.param('catbrowseaucId', catbrowseaucs.catbrowseaucByID);
};
