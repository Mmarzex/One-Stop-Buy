'use strict';

//Catbrowses service used to communicate Catbrowses REST endpoints
angular.module('catbrowses').factory('Catbrowses', ['$resource',
	function($resource) {
		return $resource('catbrowses/:catbrowseId', { catbrowseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);