'use strict';

// Catbrowses controller
angular.module('catbrowses').controller('CatbrowsesController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Catbrowses',
	function($scope, $http, $stateParams, $location, Authentication, Catbrowses) {
		$scope.authentication = Authentication;

		// Create new Catbrowse
		$scope.create = function() {
			// Create new Catbrowse object
			var catbrowse = new Catbrowses ({
				name: this.name
			});

			// Redirect after save
			catbrowse.$save(function(response) {
				$location.path('catbrowses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Catbrowse
		$scope.remove = function(catbrowse) {
			if ( catbrowse ) { 
				catbrowse.$remove();

				for (var i in $scope.catbrowses) {
					if ($scope.catbrowses [i] === catbrowse) {
						$scope.catbrowses.splice(i, 1);
					}
				}
			} else {
				$scope.catbrowse.$remove(function() {
					$location.path('catbrowses');
				});
			}
		};

		// Update existing Catbrowse
		$scope.update = function() {
			var catbrowse = $scope.catbrowse;

			catbrowse.$update(function() {
				$location.path('catbrowses/' + catbrowse._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Catbrowses
		$scope.find = function() {
			$scope.catbrowses = Catbrowses.query();
		};

		// Find existing Catbrowse
		$scope.findOne = function() {
			$scope.catbrowse = Catbrowses.get({ 
				catbrowseId: $stateParams.catbrowseId
			});
		};

		// Find all items in category
		$scope.itemsInCat = function() {
			var cat = $stateParams.catbrowseId;

			$http.get('/itemsincats?cat=' + cat).success(function(data, status, headers, config){
				console.log(data);
				$scope.itemsincat = data;
			}).error(function(data, status, headers, config){
				alert('error');
			});

		}
	}
]);