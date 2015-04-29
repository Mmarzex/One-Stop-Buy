'use strict';

// Searches controller
angular.module('searches').controller('SearchesController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Searches',
	function($scope, $http, $stateParams, $location, Authentication, Searches) {
		$scope.authentication = Authentication;

		// Create new Search
		$scope.create = function() {
			// Create new Search object
			var search = new Searches ({
				name: this.name
			});

			// Redirect after save
			search.$save(function(response) {
				// $location.path('searches/' + response._id);
				$location.path('searches/test')
				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Search
		$scope.remove = function(search) {
			if ( search ) { 
				search.$remove();

				for (var i in $scope.searches) {
					if ($scope.searches [i] === search) {
						$scope.searches.splice(i, 1);
					}
				}
			} else {
				$scope.search.$remove(function() {
					$location.path('searches');
				});
			}
		};

		// Update existing Search
		$scope.update = function() {
			var search = $scope.search;

			search.$update(function() {
				$location.path('searches/' + search._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Searches
		$scope.find = function() {
			$scope.searches = Searches.query();
		};

		// Find existing Search
		$scope.findOne = function() {
			$scope.search = Searches.get({ 
				searchId: $stateParams.searchId
			});
		};

		$scope.search = function(term) {

			$http.get('/itemsearch?searchterm=' + term).success(function(data, status, headers, config){
				console.log(data);
				$scope.itemresults = data;
			}).error(function(data, status, headers, config){
				alert('error');
			});

			$http.get('/auctionsearch?searchterm=' + term).success(function(data, status, headers, config){
				console.log(data);
				$scope.auctionresults = data;
			}).error(function(data, status, headers, config){
				alert('error');
			});
		};
	}
]);