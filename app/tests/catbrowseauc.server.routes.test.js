'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Catbrowseauc = mongoose.model('Catbrowseauc'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, catbrowseauc;

/**
 * Catbrowseauc routes tests
 */
describe('Catbrowseauc CRUD tests', function() {
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

		// Save a user to the test db and create new Catbrowseauc
		user.save(function() {
			catbrowseauc = {
				name: 'Catbrowseauc Name'
			};

			done();
		});
	});

	it('should be able to save Catbrowseauc instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Catbrowseauc
				agent.post('/catbrowseaucs')
					.send(catbrowseauc)
					.expect(200)
					.end(function(catbrowseaucSaveErr, catbrowseaucSaveRes) {
						// Handle Catbrowseauc save error
						if (catbrowseaucSaveErr) done(catbrowseaucSaveErr);

						// Get a list of Catbrowseaucs
						agent.get('/catbrowseaucs')
							.end(function(catbrowseaucsGetErr, catbrowseaucsGetRes) {
								// Handle Catbrowseauc save error
								if (catbrowseaucsGetErr) done(catbrowseaucsGetErr);

								// Get Catbrowseaucs list
								var catbrowseaucs = catbrowseaucsGetRes.body;

								// Set assertions
								(catbrowseaucs[0].user._id).should.equal(userId);
								(catbrowseaucs[0].name).should.match('Catbrowseauc Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Catbrowseauc instance if not logged in', function(done) {
		agent.post('/catbrowseaucs')
			.send(catbrowseauc)
			.expect(401)
			.end(function(catbrowseaucSaveErr, catbrowseaucSaveRes) {
				// Call the assertion callback
				done(catbrowseaucSaveErr);
			});
	});

	it('should not be able to save Catbrowseauc instance if no name is provided', function(done) {
		// Invalidate name field
		catbrowseauc.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Catbrowseauc
				agent.post('/catbrowseaucs')
					.send(catbrowseauc)
					.expect(400)
					.end(function(catbrowseaucSaveErr, catbrowseaucSaveRes) {
						// Set message assertion
						(catbrowseaucSaveRes.body.message).should.match('Please fill Catbrowseauc name');
						
						// Handle Catbrowseauc save error
						done(catbrowseaucSaveErr);
					});
			});
	});

	it('should be able to update Catbrowseauc instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Catbrowseauc
				agent.post('/catbrowseaucs')
					.send(catbrowseauc)
					.expect(200)
					.end(function(catbrowseaucSaveErr, catbrowseaucSaveRes) {
						// Handle Catbrowseauc save error
						if (catbrowseaucSaveErr) done(catbrowseaucSaveErr);

						// Update Catbrowseauc name
						catbrowseauc.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Catbrowseauc
						agent.put('/catbrowseaucs/' + catbrowseaucSaveRes.body._id)
							.send(catbrowseauc)
							.expect(200)
							.end(function(catbrowseaucUpdateErr, catbrowseaucUpdateRes) {
								// Handle Catbrowseauc update error
								if (catbrowseaucUpdateErr) done(catbrowseaucUpdateErr);

								// Set assertions
								(catbrowseaucUpdateRes.body._id).should.equal(catbrowseaucSaveRes.body._id);
								(catbrowseaucUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Catbrowseaucs if not signed in', function(done) {
		// Create new Catbrowseauc model instance
		var catbrowseaucObj = new Catbrowseauc(catbrowseauc);

		// Save the Catbrowseauc
		catbrowseaucObj.save(function() {
			// Request Catbrowseaucs
			request(app).get('/catbrowseaucs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Catbrowseauc if not signed in', function(done) {
		// Create new Catbrowseauc model instance
		var catbrowseaucObj = new Catbrowseauc(catbrowseauc);

		// Save the Catbrowseauc
		catbrowseaucObj.save(function() {
			request(app).get('/catbrowseaucs/' + catbrowseaucObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', catbrowseauc.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Catbrowseauc instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Catbrowseauc
				agent.post('/catbrowseaucs')
					.send(catbrowseauc)
					.expect(200)
					.end(function(catbrowseaucSaveErr, catbrowseaucSaveRes) {
						// Handle Catbrowseauc save error
						if (catbrowseaucSaveErr) done(catbrowseaucSaveErr);

						// Delete existing Catbrowseauc
						agent.delete('/catbrowseaucs/' + catbrowseaucSaveRes.body._id)
							.send(catbrowseauc)
							.expect(200)
							.end(function(catbrowseaucDeleteErr, catbrowseaucDeleteRes) {
								// Handle Catbrowseauc error error
								if (catbrowseaucDeleteErr) done(catbrowseaucDeleteErr);

								// Set assertions
								(catbrowseaucDeleteRes.body._id).should.equal(catbrowseaucSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Catbrowseauc instance if not signed in', function(done) {
		// Set Catbrowseauc user 
		catbrowseauc.user = user;

		// Create new Catbrowseauc model instance
		var catbrowseaucObj = new Catbrowseauc(catbrowseauc);

		// Save the Catbrowseauc
		catbrowseaucObj.save(function() {
			// Try deleting Catbrowseauc
			request(app).delete('/catbrowseaucs/' + catbrowseaucObj._id)
			.expect(401)
			.end(function(catbrowseaucDeleteErr, catbrowseaucDeleteRes) {
				// Set message assertion
				(catbrowseaucDeleteRes.body.message).should.match('User is not logged in');

				// Handle Catbrowseauc error error
				done(catbrowseaucDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Catbrowseauc.remove().exec();
		done();
	});
});