'use strict';

(function() {
	// Onestopshoppers Controller Spec
	describe('Onestopshoppers Controller Tests', function() {
		// Initialize global variables
		var OnestopshoppersController,
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

			// Initialize the Onestopshoppers controller.
			OnestopshoppersController = $controller('OnestopshoppersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Onestopshopper object fetched from XHR', inject(function(Onestopshoppers) {
			// Create sample Onestopshopper using the Onestopshoppers service
			var sampleOnestopshopper = new Onestopshoppers({
				name: 'New Onestopshopper'
			});

			// Create a sample Onestopshoppers array that includes the new Onestopshopper
			var sampleOnestopshoppers = [sampleOnestopshopper];

			// Set GET response
			$httpBackend.expectGET('onestopshoppers').respond(sampleOnestopshoppers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.onestopshoppers).toEqualData(sampleOnestopshoppers);
		}));

		it('$scope.findOne() should create an array with one Onestopshopper object fetched from XHR using a onestopshopperId URL parameter', inject(function(Onestopshoppers) {
			// Define a sample Onestopshopper object
			var sampleOnestopshopper = new Onestopshoppers({
				name: 'New Onestopshopper'
			});

			// Set the URL parameter
			$stateParams.onestopshopperId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/onestopshoppers\/([0-9a-fA-F]{24})$/).respond(sampleOnestopshopper);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.onestopshopper).toEqualData(sampleOnestopshopper);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Onestopshoppers) {
			// Create a sample Onestopshopper object
			var sampleOnestopshopperPostData = new Onestopshoppers({
				name: 'New Onestopshopper'
			});

			// Create a sample Onestopshopper response
			var sampleOnestopshopperResponse = new Onestopshoppers({
				_id: '525cf20451979dea2c000001',
				name: 'New Onestopshopper'
			});

			// Fixture mock form input values
			scope.name = 'New Onestopshopper';

			// Set POST response
			$httpBackend.expectPOST('onestopshoppers', sampleOnestopshopperPostData).respond(sampleOnestopshopperResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Onestopshopper was created
			expect($location.path()).toBe('/onestopshoppers/' + sampleOnestopshopperResponse._id);
		}));

		it('$scope.update() should update a valid Onestopshopper', inject(function(Onestopshoppers) {
			// Define a sample Onestopshopper put data
			var sampleOnestopshopperPutData = new Onestopshoppers({
				_id: '525cf20451979dea2c000001',
				name: 'New Onestopshopper'
			});

			// Mock Onestopshopper in scope
			scope.onestopshopper = sampleOnestopshopperPutData;

			// Set PUT response
			$httpBackend.expectPUT(/onestopshoppers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/onestopshoppers/' + sampleOnestopshopperPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid onestopshopperId and remove the Onestopshopper from the scope', inject(function(Onestopshoppers) {
			// Create new Onestopshopper object
			var sampleOnestopshopper = new Onestopshoppers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Onestopshoppers array and include the Onestopshopper
			scope.onestopshoppers = [sampleOnestopshopper];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/onestopshoppers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOnestopshopper);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.onestopshoppers.length).toBe(0);
		}));
	});
}());