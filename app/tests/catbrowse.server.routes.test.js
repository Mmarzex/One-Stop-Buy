'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Catbrowse = mongoose.model('Catbrowse'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, catbrowse;

/**
 * Catbrowse routes tests
 */
describe('Catbrowse CRUD tests', function() {
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

		// Save a user to the test db and create new Catbrowse
		user.save(function() {
			catbrowse = {
				name: 'Catbrowse Name'
			};

			done();
		});
	});

	it('should be able to save Catbrowse instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Catbrowse
				agent.post('/catbrowses')
					.send(catbrowse)
					.expect(200)
					.end(function(catbrowseSaveErr, catbrowseSaveRes) {
						// Handle Catbrowse save error
						if (catbrowseSaveErr) done(catbrowseSaveErr);

						// Get a list of Catbrowses
						agent.get('/catbrowses')
							.end(function(catbrowsesGetErr, catbrowsesGetRes) {
								// Handle Catbrowse save error
								if (catbrowsesGetErr) done(catbrowsesGetErr);

								// Get Catbrowses list
								var catbrowses = catbrowsesGetRes.body;

								// Set assertions
								(catbrowses[0].user._id).should.equal(userId);
								(catbrowses[0].name).should.match('Catbrowse Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Catbrowse instance if not logged in', function(done) {
		agent.post('/catbrowses')
			.send(catbrowse)
			.expect(401)
			.end(function(catbrowseSaveErr, catbrowseSaveRes) {
				// Call the assertion callback
				done(catbrowseSaveErr);
			});
	});

	it('should not be able to save Catbrowse instance if no name is provided', function(done) {
		// Invalidate name field
		catbrowse.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Catbrowse
				agent.post('/catbrowses')
					.send(catbrowse)
					.expect(400)
					.end(function(catbrowseSaveErr, catbrowseSaveRes) {
						// Set message assertion
						(catbrowseSaveRes.body.message).should.match('Please fill Catbrowse name');
						
						// Handle Catbrowse save error
						done(catbrowseSaveErr);
					});
			});
	});

	it('should be able to update Catbrowse instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Catbrowse
				agent.post('/catbrowses')
					.send(catbrowse)
					.expect(200)
					.end(function(catbrowseSaveErr, catbrowseSaveRes) {
						// Handle Catbrowse save error
						if (catbrowseSaveErr) done(catbrowseSaveErr);

						// Update Catbrowse name
						catbrowse.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Catbrowse
						agent.put('/catbrowses/' + catbrowseSaveRes.body._id)
							.send(catbrowse)
							.expect(200)
							.end(function(catbrowseUpdateErr, catbrowseUpdateRes) {
								// Handle Catbrowse update error
								if (catbrowseUpdateErr) done(catbrowseUpdateErr);

								// Set assertions
								(catbrowseUpdateRes.body._id).should.equal(catbrowseSaveRes.body._id);
								(catbrowseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Catbrowses if not signed in', function(done) {
		// Create new Catbrowse model instance
		var catbrowseObj = new Catbrowse(catbrowse);

		// Save the Catbrowse
		catbrowseObj.save(function() {
			// Request Catbrowses
			request(app).get('/catbrowses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Catbrowse if not signed in', function(done) {
		// Create new Catbrowse model instance
		var catbrowseObj = new Catbrowse(catbrowse);

		// Save the Catbrowse
		catbrowseObj.save(function() {
			request(app).get('/catbrowses/' + catbrowseObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', catbrowse.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Catbrowse instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Catbrowse
				agent.post('/catbrowses')
					.send(catbrowse)
					.expect(200)
					.end(function(catbrowseSaveErr, catbrowseSaveRes) {
						// Handle Catbrowse save error
						if (catbrowseSaveErr) done(catbrowseSaveErr);

						// Delete existing Catbrowse
						agent.delete('/catbrowses/' + catbrowseSaveRes.body._id)
							.send(catbrowse)
							.expect(200)
							.end(function(catbrowseDeleteErr, catbrowseDeleteRes) {
								// Handle Catbrowse error error
								if (catbrowseDeleteErr) done(catbrowseDeleteErr);

								// Set assertions
								(catbrowseDeleteRes.body._id).should.equal(catbrowseSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Catbrowse instance if not signed in', function(done) {
		// Set Catbrowse user 
		catbrowse.user = user;

		// Create new Catbrowse model instance
		var catbrowseObj = new Catbrowse(catbrowse);

		// Save the Catbrowse
		catbrowseObj.save(function() {
			// Try deleting Catbrowse
			request(app).delete('/catbrowses/' + catbrowseObj._id)
			.expect(401)
			.end(function(catbrowseDeleteErr, catbrowseDeleteRes) {
				// Set message assertion
				(catbrowseDeleteRes.body.message).should.match('User is not logged in');

				// Handle Catbrowse error error
				done(catbrowseDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Catbrowse.remove().exec();
		done();
	});
});