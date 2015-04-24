'use strict';

//Catbrowseaucs service used to communicate Catbrowseaucs REST endpoints
angular.module('catbrowseaucs').factory('Catbrowseaucs', ['$resource',
	function($resource) {
		return $resource('catbrowseaucs/:catbrowseaucId', { catbrowseaucId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);