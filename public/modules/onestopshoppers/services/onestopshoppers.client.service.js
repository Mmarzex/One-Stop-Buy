'use strict';

//Onestopshoppers service used to communicate Onestopshoppers REST endpoints
angular.module('onestopshoppers').factory('Onestopshoppers', ['$resource',
	function($resource) {
		return $resource('onestopshoppers/:onestopshopperId', { onestopshopperId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);