'use strict';

// Onestopshoppers controller
angular.module('onestopshoppers').controller('OnestopshoppersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Onestopshoppers',
	function($scope, $stateParams, $location, Authentication, Onestopshoppers) {
		$scope.authentication = Authentication;

		// Create new Onestopshopper
		$scope.create = function() {
			// Create new Onestopshopper object
			var onestopshopper = new Onestopshoppers ({
				name: this.name
			});

			// Redirect after save
			onestopshopper.$save(function(response) {
				$location.path('onestopshoppers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Onestopshopper
		$scope.remove = function(onestopshopper) {
			if ( onestopshopper ) { 
				onestopshopper.$remove();

				for (var i in $scope.onestopshoppers) {
					if ($scope.onestopshoppers [i] === onestopshopper) {
						$scope.onestopshoppers.splice(i, 1);
					}
				}
			} else {
				$scope.onestopshopper.$remove(function() {
					$location.path('onestopshoppers');
				});
			}
		};

		// Update existing Onestopshopper
		$scope.update = function() {
			var onestopshopper = $scope.onestopshopper;

			onestopshopper.$update(function() {
				$location.path('onestopshoppers/' + onestopshopper._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Onestopshoppers
		$scope.find = function() {
			$scope.onestopshoppers = Onestopshoppers.query();
		};

		// Find existing Onestopshopper
		$scope.findOne = function() {
			$scope.onestopshopper = Onestopshoppers.get({ 
				onestopshopperId: $stateParams.onestopshopperId
			});
		};
	}
]);