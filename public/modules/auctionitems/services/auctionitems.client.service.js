'use strict';

//Auctionitems service used to communicate Auctionitems REST endpoints
angular.module('auctionitems').factory('Auctionitems', ['$resource',
	function($resource) {
		return $resource('auctionitems/:auctionitemId', { auctionitemId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			bid: {
				method: 'PUT'
			}
		});
	}
]);