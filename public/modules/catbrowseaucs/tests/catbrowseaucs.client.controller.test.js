'use strict';

(function() {
	// Catbrowseaucs Controller Spec
	describe('Catbrowseaucs Controller Tests', function() {
		// Initialize global variables
		var CatbrowseaucsController,
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

			// Initialize the Catbrowseaucs controller.
			CatbrowseaucsController = $controller('CatbrowseaucsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Catbrowseauc object fetched from XHR', inject(function(Catbrowseaucs) {
			// Create sample Catbrowseauc using the Catbrowseaucs service
			var sampleCatbrowseauc = new Catbrowseaucs({
				name: 'New Catbrowseauc'
			});

			// Create a sample Catbrowseaucs array that includes the new Catbrowseauc
			var sampleCatbrowseaucs = [sampleCatbrowseauc];

			// Set GET response
			$httpBackend.expectGET('catbrowseaucs').respond(sampleCatbrowseaucs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.catbrowseaucs).toEqualData(sampleCatbrowseaucs);
		}));

		it('$scope.findOne() should create an array with one Catbrowseauc object fetched from XHR using a catbrowseaucId URL parameter', inject(function(Catbrowseaucs) {
			// Define a sample Catbrowseauc object
			var sampleCatbrowseauc = new Catbrowseaucs({
				name: 'New Catbrowseauc'
			});

			// Set the URL parameter
			$stateParams.catbrowseaucId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/catbrowseaucs\/([0-9a-fA-F]{24})$/).respond(sampleCatbrowseauc);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.catbrowseauc).toEqualData(sampleCatbrowseauc);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Catbrowseaucs) {
			// Create a sample Catbrowseauc object
			var sampleCatbrowseaucPostData = new Catbrowseaucs({
				name: 'New Catbrowseauc'
			});

			// Create a sample Catbrowseauc response
			var sampleCatbrowseaucResponse = new Catbrowseaucs({
				_id: '525cf20451979dea2c000001',
				name: 'New Catbrowseauc'
			});

			// Fixture mock form input values
			scope.name = 'New Catbrowseauc';

			// Set POST response
			$httpBackend.expectPOST('catbrowseaucs', sampleCatbrowseaucPostData).respond(sampleCatbrowseaucResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Catbrowseauc was created
			expect($location.path()).toBe('/catbrowseaucs/' + sampleCatbrowseaucResponse._id);
		}));

		it('$scope.update() should update a valid Catbrowseauc', inject(function(Catbrowseaucs) {
			// Define a sample Catbrowseauc put data
			var sampleCatbrowseaucPutData = new Catbrowseaucs({
				_id: '525cf20451979dea2c000001',
				name: 'New Catbrowseauc'
			});

			// Mock Catbrowseauc in scope
			scope.catbrowseauc = sampleCatbrowseaucPutData;

			// Set PUT response
			$httpBackend.expectPUT(/catbrowseaucs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/catbrowseaucs/' + sampleCatbrowseaucPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid catbrowseaucId and remove the Catbrowseauc from the scope', inject(function(Catbrowseaucs) {
			// Create new Catbrowseauc object
			var sampleCatbrowseauc = new Catbrowseaucs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Catbrowseaucs array and include the Catbrowseauc
			scope.catbrowseaucs = [sampleCatbrowseauc];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/catbrowseaucs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCatbrowseauc);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.catbrowseaucs.length).toBe(0);
		}));
	});
}());