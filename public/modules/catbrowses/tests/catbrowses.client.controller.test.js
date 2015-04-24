'use strict';

(function() {
	// Catbrowses Controller Spec
	describe('Catbrowses Controller Tests', function() {
		// Initialize global variables
		var CatbrowsesController,
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

			// Initialize the Catbrowses controller.
			CatbrowsesController = $controller('CatbrowsesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Catbrowse object fetched from XHR', inject(function(Catbrowses) {
			// Create sample Catbrowse using the Catbrowses service
			var sampleCatbrowse = new Catbrowses({
				name: 'New Catbrowse'
			});

			// Create a sample Catbrowses array that includes the new Catbrowse
			var sampleCatbrowses = [sampleCatbrowse];

			// Set GET response
			$httpBackend.expectGET('catbrowses').respond(sampleCatbrowses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.catbrowses).toEqualData(sampleCatbrowses);
		}));

		it('$scope.findOne() should create an array with one Catbrowse object fetched from XHR using a catbrowseId URL parameter', inject(function(Catbrowses) {
			// Define a sample Catbrowse object
			var sampleCatbrowse = new Catbrowses({
				name: 'New Catbrowse'
			});

			// Set the URL parameter
			$stateParams.catbrowseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/catbrowses\/([0-9a-fA-F]{24})$/).respond(sampleCatbrowse);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.catbrowse).toEqualData(sampleCatbrowse);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Catbrowses) {
			// Create a sample Catbrowse object
			var sampleCatbrowsePostData = new Catbrowses({
				name: 'New Catbrowse'
			});

			// Create a sample Catbrowse response
			var sampleCatbrowseResponse = new Catbrowses({
				_id: '525cf20451979dea2c000001',
				name: 'New Catbrowse'
			});

			// Fixture mock form input values
			scope.name = 'New Catbrowse';

			// Set POST response
			$httpBackend.expectPOST('catbrowses', sampleCatbrowsePostData).respond(sampleCatbrowseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Catbrowse was created
			expect($location.path()).toBe('/catbrowses/' + sampleCatbrowseResponse._id);
		}));

		it('$scope.update() should update a valid Catbrowse', inject(function(Catbrowses) {
			// Define a sample Catbrowse put data
			var sampleCatbrowsePutData = new Catbrowses({
				_id: '525cf20451979dea2c000001',
				name: 'New Catbrowse'
			});

			// Mock Catbrowse in scope
			scope.catbrowse = sampleCatbrowsePutData;

			// Set PUT response
			$httpBackend.expectPUT(/catbrowses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/catbrowses/' + sampleCatbrowsePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid catbrowseId and remove the Catbrowse from the scope', inject(function(Catbrowses) {
			// Create new Catbrowse object
			var sampleCatbrowse = new Catbrowses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Catbrowses array and include the Catbrowse
			scope.catbrowses = [sampleCatbrowse];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/catbrowses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCatbrowse);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.catbrowses.length).toBe(0);
		}));
	});
}());