'use strict';

//Setting up route
angular.module('catbrowseaucs').config(['$stateProvider',
	function($stateProvider) {
		// Catbrowseaucs state routing
		$stateProvider.
		state('listCatbrowseaucs', {
			url: '/catbrowseaucs',
			templateUrl: 'modules/catbrowseaucs/views/list-catbrowseaucs.client.view.html'
		}).
		state('createCatbrowseauc', {
			url: '/catbrowseaucs/create',
			templateUrl: 'modules/catbrowseaucs/views/create-catbrowseauc.client.view.html'
		}).
		state('viewCatbrowseauc', {
			url: '/catbrowseaucs/:catbrowseaucId',
			templateUrl: 'modules/catbrowseaucs/views/view-catbrowseauc.client.view.html'
		}).
		state('editCatbrowseauc', {
			url: '/catbrowseaucs/:catbrowseaucId/edit',
			templateUrl: 'modules/catbrowseaucs/views/edit-catbrowseauc.client.view.html'
		});
	}
]);