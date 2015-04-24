'use strict';

// Catbrowseaucs controller
angular.module('catbrowseaucs').controller('CatbrowseaucsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Catbrowseaucs',
	function($scope, $http, $stateParams, $location, Authentication, Catbrowseaucs) {
		$scope.authentication = Authentication;

		// Create new Catbrowseauc
		$scope.create = function() {
			// Create new Catbrowseauc object
			var catbrowseauc = new Catbrowseaucs ({
				name: this.name
			});

			// Redirect after save
			catbrowseauc.$save(function(response) {
				$location.path('catbrowseaucs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Catbrowseauc
		$scope.remove = function(catbrowseauc) {
			if ( catbrowseauc ) { 
				catbrowseauc.$remove();

				for (var i in $scope.catbrowseaucs) {
					if ($scope.catbrowseaucs [i] === catbrowseauc) {
						$scope.catbrowseaucs.splice(i, 1);
					}
				}
			} else {
				$scope.catbrowseauc.$remove(function() {
					$location.path('catbrowseaucs');
				});
			}
		};

		// Update existing Catbrowseauc
		$scope.update = function() {
			var catbrowseauc = $scope.catbrowseauc;

			catbrowseauc.$update(function() {
				$location.path('catbrowseaucs/' + catbrowseauc._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Catbrowseaucs
		$scope.find = function() {
			$scope.catbrowseaucs = Catbrowseaucs.query();
		};

		// Find existing Catbrowseauc
		$scope.findOne = function() {
			$scope.catbrowseauc = Catbrowseaucs.get({ 
				catbrowseaucId: $stateParams.catbrowseaucId
			});
		};

		// Find all Auctions in category
		$scope.auctionsInCat = function() {
			var cat = $stateParams.catbrowseaucId;

			$http.get('/auctionincats?cat=' + cat).success(function(data, status, headers, config){
				console.log(data);
				$scope.auctionsincat = data;
			}).error(function(data, status, headers, config){
				alert('error');
			});
		};
	}
]);