'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication',
	function($scope, $http, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		
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

		$scope.featured = function() {

			$http.get('/featureditems').success(function(data, status, headers, config){
				$scope.featureditems = data;
			}).error(function(data, status, headers, config){
				alert('error');
			});

			$http.get('/featuredauctions').success(function(data, status, headers, config){
				$scope.featuredauctions = data;
			}).error(function(data, status, headers, config){
				alert('error');
			});
		};
	}
]);