'use strict';

angular.module('users').controller('OrdersController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		$scope.orders = function() {
			var test = {};
			$http.get('/users/orders').success(function(data, status, headers, config) {
				test = data;
				console.log(data);
				alert('Finished');
				$scope.orders = data;
			}).error(function(data, status, headers, config){
				alert('error');
			});
			// var user = $scope.user;
			// user.$orders(function() {
			// 	$location.path('/orders');
			// });
		};

		$scope.wonauctions = function() {
			$http.get('/users/wonauctions').success(function(data, status, headers, config) {
				console.log(data);
				$scope.wonauctions = data;
			}).error(function(data, status, headers, config){
				alert('error');
			});
		};
	}
]);