'use strict';

// Auctionitems controller
angular.module('auctionitems').controller('AuctionitemsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Auctionitems',
	function($scope, $http, $stateParams, $location, Authentication, Auctionitems) {
		$scope.authentication = Authentication;
		// Create new Auctionitem
		$scope.create = function() {
			// Create new Auctionitem object
			var auctionitem = new Auctionitems ({
				name: this.name,
				description: this.description,
			 	location: this.location,
			 	buyer_name: this.buyer_name,
			 	current_bid: this.current_bid,
			 	buy_it_now: this.buy_it_now,
			 	reserve_price: this.reserve_price,
			 	auction_ended: this.auction_ended,
			 	image: this.image,
			 	category: this.category,
			 	auction_ended: this.auction_ended
			});

			// Redirect after save
			auctionitem.$save(function(response) {
				$location.path('auctionitems/' + response.id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Auctionitem
		$scope.remove = function(auctionitem) {
			if ( auctionitem ) { 
				auctionitem.$remove();

				for (var i in $scope.auctionitems) {
					if ($scope.auctionitems [i] === auctionitem) {
						$scope.auctionitems.splice(i, 1);
					}
				}
			} else {
				$scope.auctionitem.$remove(function() {
					$location.path('auctionitems');
				});
			}
		};

		// Update existing Auctionitem
		$scope.update = function() {
			var auctionitem = $scope.auctionitem;

			auctionitem.$update(function() {
				$location.path('#!/auctionitems/' + auctionitem.id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Auctionitems
		$scope.find = function() {
			$scope.auctionitems = Auctionitems.query();
		};

		// Find existing Auctionitem
		$scope.findOne = function() {
			$scope.auctionitem = Auctionitems.get({ 
				auctionitemId: $stateParams.auctionitemId
			});
		};

		$scope.bid = function(bid) {
			var bidder = $scope.authentication.user.username;
			console.log(Auctionitems)
			console.log("Bidder", bidder);
			var auctionitem = $scope.auctionitem;
			console.log(auctionitem);
			if(bidder == auctionitem.buyer_name) {
				alert("You are the highest bidder, you dumby!");
				auctionitem.$bid(function() {
					$location.path('auctionitems/' + auctionitem.id);
				});
				return;
			}

			if(bid >= 1.05 * auctionitem.current_bid) {

				auctionitem.current_bid = bid;
				auctionitem.buyer_name = bidder;
				alert("You are the highest Bidder!");
				auctionitem.$bid(function() {
					$location.path('auctionitems/' + auctionitem.id);
				});
			} else {
				alert("Your bid is not high enough!");
				auctionitem.$bid(function() {
					$location.path('auctionitems/' + auctionitem.id);
				});
			}
		};

		$scope.search = function(searchTerm) {
			var auctionitem = $scope.auctionitem;
			$scope.search = searchTerm;
			alert("Search starting");
			auctionitem.$search(function() {
				$location.path('asearch');
			});
		};

		// Get all reviews for selected auction item
		$scope.auctionreviews = function(id) {
			var item = $scope.item;
			console.log($stateParams.auctionitemId);
			var auction_id = $stateParams.auctionitemId;
			var params = {
				itemid: auction_id
			}
			$http.get('/auctionreview?auctionid=' + auction_id).success(function(data, status, headers, config){
				console.log(data);
				$scope.auctionreviews = data;
			}).error(function(data, status, headers, config) {
				alert('error');
			});
		};

		$scope.findAllCategories = function() {
			$http.get('/categories').success(function(data, status, headers, config) {
				console.log(data);
				$scope.categories = data;
			}).error(function(data, status, headers, config) {
				alert('error');
			});
		};
	}
]);