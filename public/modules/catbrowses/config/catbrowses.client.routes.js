'use strict';

//Setting up route
angular.module('catbrowses').config(['$stateProvider',
	function($stateProvider) {
		// Catbrowses state routing
		$stateProvider.
		state('listCatbrowses', {
			url: '/catbrowses',
			templateUrl: 'modules/catbrowses/views/list-catbrowses.client.view.html'
		}).
		state('createCatbrowse', {
			url: '/catbrowses/create',
			templateUrl: 'modules/catbrowses/views/create-catbrowse.client.view.html'
		}).
		state('viewCatbrowse', {
			url: '/catbrowses/:catbrowseId',
			templateUrl: 'modules/catbrowses/views/view-catbrowse.client.view.html'
		}).
		state('editCatbrowse', {
			url: '/catbrowses/:catbrowseId/edit',
			templateUrl: 'modules/catbrowses/views/edit-catbrowse.client.view.html'
		});
	}
]);