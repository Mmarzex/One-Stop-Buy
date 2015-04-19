'use strict';

//Auctionitems service used to communicate Auctionitems REST endpoints
angular.module('auctionitems').factory('Auctionitems', ['$resource',
	function($resource) {
		return $resource('auctionitems/:auctionitemId', { auctionitemId: '@id'
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

// angular.module('auctionitems').factory('Auctionitems', ['$resource',
// 	function($resource) {
// 		return $resource('asearch',{
// 			search: {
// 				method: 'PUT'
// 			}
// 		});
// 	}
// ]);