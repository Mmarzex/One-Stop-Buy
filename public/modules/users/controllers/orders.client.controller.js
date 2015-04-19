'use strict';

angular.module('users').controller('OrdersController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		$scope.orders = function() {
			// var user = $scope.user;
			// user.$orders(function() {
			// 	$location.path('/orders');
			// });
		};
	}
]);