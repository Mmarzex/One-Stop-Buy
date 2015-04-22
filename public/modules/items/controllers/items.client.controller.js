'use strict';

// Items controller
angular.module('items').controller('ItemsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Items',
	function($scope, $http, $stateParams, $location, Authentication, Items) {
		$scope.authentication = Authentication;

		// Create new Item
		$scope.create = function() {
			// Create new Item object
			var item = new Items ({
				name: this.name,
				description: this.description,
				location: this.location,
				stock: this.stock,
				price: this.price,
				// creator: this.creator,
				image: this.image
			});

			// Redirect after save
			item.$save(function(response) {
				$location.path('items/' + response.id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Item
		$scope.remove = function(item) {
			if ( item ) { 
				item.$remove();

				for (var i in $scope.items) {
					if ($scope.items [i] === item) {
						$scope.items.splice(i, 1);
					}
				}
			} else {
				$scope.item.$remove(function() {
					$location.path('items');
				});
			}
		};

		// Update existing Item
		$scope.update = function() {
			var item = $scope.item;

			item.$update(function() {
				$location.path('items/' + item.id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Items
		$scope.find = function() {
			$scope.items = Items.query();
		};

		// Find existing Item
		$scope.findOne = function() {
			$scope.item = Items.get({ 
				itemId: $stateParams.itemId
			});
		};

		// an available item
		$scope.buy = function() {
			var buyer = $scope.authentication.user.username;
			var isShopper = $scope.authentication.user.isShopper;
			var item = $scope.item;
			if(item.stock > 0) {
				item.stock -= 1;
				if(isShopper) {
					alert("Your item will be on its way soon to " + $scope.authentication.user.address.street + ". With OneStopShopper shipping.");
				} else {
					alert("Your item will be on its way soon to " + $scope.authentication.user.address.street + ". With standard shipping.");
				}
				item.$buy(function() {
					$location.path('items/' + item.id);
				});
			} else {
				alert("No more stock to buy. You are added to the waitinglist");
				item.$buy(function() {
					$location.path('items/' + item.id);
				})
			}
			
			// if(buyer = item.creator) {
			// 	alert("You cannot buy an item you created.");
			// 	item.$buy(function() {
			// 		$location.path('items/' + item.id);
			// 	});
			// 	return;
			// } else {
				
			// }
		};

		// get all reviews for selected item
		$scope.itemreviews = function(id) {
			var item = $scope.item;
			console.log($stateParams.itemId);
			var item_id = $stateParams.itemId;
			var params = {
				itemid: item_id
			}
			$http.get('/itemreview?itemid=' + item_id).success(function(data, status, headers, config){
				console.log(data);
				$scope.itemreviews = data;
			}).error(function(data, status, headers, config) {
				alert('error');
			});
		};
	}
]);