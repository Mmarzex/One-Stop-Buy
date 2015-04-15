'use strict';

(function() {
	// Auctionitems Controller Spec
	describe('Auctionitems Controller Tests', function() {
		// Initialize global variables
		var AuctionitemsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Auctionitems controller.
			AuctionitemsController = $controller('AuctionitemsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Auctionitem object fetched from XHR', inject(function(Auctionitems) {
			// Create sample Auctionitem using the Auctionitems service
			var sampleAuctionitem = new Auctionitems({
				name: 'New Auctionitem'
			});

			// Create a sample Auctionitems array that includes the new Auctionitem
			var sampleAuctionitems = [sampleAuctionitem];

			// Set GET response
			$httpBackend.expectGET('auctionitems').respond(sampleAuctionitems);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.auctionitems).toEqualData(sampleAuctionitems);
		}));

		it('$scope.findOne() should create an array with one Auctionitem object fetched from XHR using a auctionitemId URL parameter', inject(function(Auctionitems) {
			// Define a sample Auctionitem object
			var sampleAuctionitem = new Auctionitems({
				name: 'New Auctionitem'
			});

			// Set the URL parameter
			$stateParams.auctionitemId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/auctionitems\/([0-9a-fA-F]{24})$/).respond(sampleAuctionitem);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.auctionitem).toEqualData(sampleAuctionitem);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Auctionitems) {
			// Create a sample Auctionitem object
			var sampleAuctionitemPostData = new Auctionitems({
				name: 'New Auctionitem'
			});

			// Create a sample Auctionitem response
			var sampleAuctionitemResponse = new Auctionitems({
				_id: '525cf20451979dea2c000001',
				name: 'New Auctionitem'
			});

			// Fixture mock form input values
			scope.name = 'New Auctionitem';

			// Set POST response
			$httpBackend.expectPOST('auctionitems', sampleAuctionitemPostData).respond(sampleAuctionitemResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Auctionitem was created
			expect($location.path()).toBe('/auctionitems/' + sampleAuctionitemResponse._id);
		}));

		it('$scope.update() should update a valid Auctionitem', inject(function(Auctionitems) {
			// Define a sample Auctionitem put data
			var sampleAuctionitemPutData = new Auctionitems({
				_id: '525cf20451979dea2c000001',
				name: 'New Auctionitem'
			});

			// Mock Auctionitem in scope
			scope.auctionitem = sampleAuctionitemPutData;

			// Set PUT response
			$httpBackend.expectPUT(/auctionitems\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/auctionitems/' + sampleAuctionitemPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid auctionitemId and remove the Auctionitem from the scope', inject(function(Auctionitems) {
			// Create new Auctionitem object
			var sampleAuctionitem = new Auctionitems({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Auctionitems array and include the Auctionitem
			scope.auctionitems = [sampleAuctionitem];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/auctionitems\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAuctionitem);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.auctionitems.length).toBe(0);
		}));
	});
}());