'use strict';

//Setting up route
angular.module('auctionitems').config(['$stateProvider',
	function($stateProvider) {
		// Auctionitems state routing
		$stateProvider.
		state('listAuctionitems', {
			url: '/auctionitems',
			templateUrl: 'modules/auctionitems/views/list-auctionitems.client.view.html'
		}).
		state('createAuctionitem', {
			url: '/auctionitems/create',
			templateUrl: 'modules/auctionitems/views/create-auctionitem.client.view.html'
		}).
		state('viewAuctionitem', {
			url: '/auctionitems/:auctionitemId',
			templateUrl: 'modules/auctionitems/views/view-auctionitem.client.view.html'
		}).
		state('editAuctionitem', {
			url: '/auctionitems/:auctionitemId/edit',
			templateUrl: 'modules/auctionitems/views/edit-auctionitem.client.view.html'
		}).
		state('searchAuctionitem', {
			url: '/asearch',
			templateUrl: 'modules/auctionitems/views/search-auctionitem.client.view.html'
		});
	}
]);