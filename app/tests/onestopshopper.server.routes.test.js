'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Onestopshopper = mongoose.model('Onestopshopper'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, onestopshopper;

/**
 * Onestopshopper routes tests
 */
describe('Onestopshopper CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Onestopshopper
		user.save(function() {
			onestopshopper = {
				name: 'Onestopshopper Name'
			};

			done();
		});
	});

	it('should be able to save Onestopshopper instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Onestopshopper
				agent.post('/onestopshoppers')
					.send(onestopshopper)
					.expect(200)
					.end(function(onestopshopperSaveErr, onestopshopperSaveRes) {
						// Handle Onestopshopper save error
						if (onestopshopperSaveErr) done(onestopshopperSaveErr);

						// Get a list of Onestopshoppers
						agent.get('/onestopshoppers')
							.end(function(onestopshoppersGetErr, onestopshoppersGetRes) {
								// Handle Onestopshopper save error
								if (onestopshoppersGetErr) done(onestopshoppersGetErr);

								// Get Onestopshoppers list
								var onestopshoppers = onestopshoppersGetRes.body;

								// Set assertions
								(onestopshoppers[0].user._id).should.equal(userId);
								(onestopshoppers[0].name).should.match('Onestopshopper Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Onestopshopper instance if not logged in', function(done) {
		agent.post('/onestopshoppers')
			.send(onestopshopper)
			.expect(401)
			.end(function(onestopshopperSaveErr, onestopshopperSaveRes) {
				// Call the assertion callback
				done(onestopshopperSaveErr);
			});
	});

	it('should not be able to save Onestopshopper instance if no name is provided', function(done) {
		// Invalidate name field
		onestopshopper.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Onestopshopper
				agent.post('/onestopshoppers')
					.send(onestopshopper)
					.expect(400)
					.end(function(onestopshopperSaveErr, onestopshopperSaveRes) {
						// Set message assertion
						(onestopshopperSaveRes.body.message).should.match('Please fill Onestopshopper name');
						
						// Handle Onestopshopper save error
						done(onestopshopperSaveErr);
					});
			});
	});

	it('should be able to update Onestopshopper instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Onestopshopper
				agent.post('/onestopshoppers')
					.send(onestopshopper)
					.expect(200)
					.end(function(onestopshopperSaveErr, onestopshopperSaveRes) {
						// Handle Onestopshopper save error
						if (onestopshopperSaveErr) done(onestopshopperSaveErr);

						// Update Onestopshopper name
						onestopshopper.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Onestopshopper
						agent.put('/onestopshoppers/' + onestopshopperSaveRes.body._id)
							.send(onestopshopper)
							.expect(200)
							.end(function(onestopshopperUpdateErr, onestopshopperUpdateRes) {
								// Handle Onestopshopper update error
								if (onestopshopperUpdateErr) done(onestopshopperUpdateErr);

								// Set assertions
								(onestopshopperUpdateRes.body._id).should.equal(onestopshopperSaveRes.body._id);
								(onestopshopperUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Onestopshoppers if not signed in', function(done) {
		// Create new Onestopshopper model instance
		var onestopshopperObj = new Onestopshopper(onestopshopper);

		// Save the Onestopshopper
		onestopshopperObj.save(function() {
			// Request Onestopshoppers
			request(app).get('/onestopshoppers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Onestopshopper if not signed in', function(done) {
		// Create new Onestopshopper model instance
		var onestopshopperObj = new Onestopshopper(onestopshopper);

		// Save the Onestopshopper
		onestopshopperObj.save(function() {
			request(app).get('/onestopshoppers/' + onestopshopperObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', onestopshopper.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Onestopshopper instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Onestopshopper
				agent.post('/onestopshoppers')
					.send(onestopshopper)
					.expect(200)
					.end(function(onestopshopperSaveErr, onestopshopperSaveRes) {
						// Handle Onestopshopper save error
						if (onestopshopperSaveErr) done(onestopshopperSaveErr);

						// Delete existing Onestopshopper
						agent.delete('/onestopshoppers/' + onestopshopperSaveRes.body._id)
							.send(onestopshopper)
							.expect(200)
							.end(function(onestopshopperDeleteErr, onestopshopperDeleteRes) {
								// Handle Onestopshopper error error
								if (onestopshopperDeleteErr) done(onestopshopperDeleteErr);

								// Set assertions
								(onestopshopperDeleteRes.body._id).should.equal(onestopshopperSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Onestopshopper instance if not signed in', function(done) {
		// Set Onestopshopper user 
		onestopshopper.user = user;

		// Create new Onestopshopper model instance
		var onestopshopperObj = new Onestopshopper(onestopshopper);

		// Save the Onestopshopper
		onestopshopperObj.save(function() {
			// Try deleting Onestopshopper
			request(app).delete('/onestopshoppers/' + onestopshopperObj._id)
			.expect(401)
			.end(function(onestopshopperDeleteErr, onestopshopperDeleteRes) {
				// Set message assertion
				(onestopshopperDeleteRes.body.message).should.match('User is not logged in');

				// Handle Onestopshopper error error
				done(onestopshopperDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Onestopshopper.remove().exec();
		done();
	});
});