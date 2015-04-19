'use strict';

//Setting up route
angular.module('onestopshoppers').config(['$stateProvider',
	function($stateProvider) {
		// Onestopshoppers state routing
		$stateProvider.
		state('listOnestopshoppers', {
			url: '/onestopshoppers',
			templateUrl: 'modules/onestopshoppers/views/list-onestopshoppers.client.view.html'
		}).
		state('createOnestopshopper', {
			url: '/onestopshoppers/create',
			templateUrl: 'modules/onestopshoppers/views/create-onestopshopper.client.view.html'
		}).
		state('viewOnestopshopper', {
			url: '/onestopshoppers/:onestopshopperId',
			templateUrl: 'modules/onestopshoppers/views/view-onestopshopper.client.view.html'
		}).
		state('editOnestopshopper', {
			url: '/onestopshoppers/:onestopshopperId/edit',
			templateUrl: 'modules/onestopshoppers/views/edit-onestopshopper.client.view.html'
		});
	}
]);