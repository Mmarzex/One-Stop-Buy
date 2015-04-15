'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Auctionitem = mongoose.model('Auctionitem'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, auctionitem;

/**
 * Auctionitem routes tests
 */
describe('Auctionitem CRUD tests', function() {
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

		// Save a user to the test db and create new Auctionitem
		user.save(function() {
			auctionitem = {
				name: 'Auctionitem Name'
			};

			done();
		});
	});

	it('should be able to save Auctionitem instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Auctionitem
				agent.post('/auctionitems')
					.send(auctionitem)
					.expect(200)
					.end(function(auctionitemSaveErr, auctionitemSaveRes) {
						// Handle Auctionitem save error
						if (auctionitemSaveErr) done(auctionitemSaveErr);

						// Get a list of Auctionitems
						agent.get('/auctionitems')
							.end(function(auctionitemsGetErr, auctionitemsGetRes) {
								// Handle Auctionitem save error
								if (auctionitemsGetErr) done(auctionitemsGetErr);

								// Get Auctionitems list
								var auctionitems = auctionitemsGetRes.body;

								// Set assertions
								(auctionitems[0].user._id).should.equal(userId);
								(auctionitems[0].name).should.match('Auctionitem Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Auctionitem instance if not logged in', function(done) {
		agent.post('/auctionitems')
			.send(auctionitem)
			.expect(401)
			.end(function(auctionitemSaveErr, auctionitemSaveRes) {
				// Call the assertion callback
				done(auctionitemSaveErr);
			});
	});

	it('should not be able to save Auctionitem instance if no name is provided', function(done) {
		// Invalidate name field
		auctionitem.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Auctionitem
				agent.post('/auctionitems')
					.send(auctionitem)
					.expect(400)
					.end(function(auctionitemSaveErr, auctionitemSaveRes) {
						// Set message assertion
						(auctionitemSaveRes.body.message).should.match('Please fill Auctionitem name');
						
						// Handle Auctionitem save error
						done(auctionitemSaveErr);
					});
			});
	});

	it('should be able to update Auctionitem instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Auctionitem
				agent.post('/auctionitems')
					.send(auctionitem)
					.expect(200)
					.end(function(auctionitemSaveErr, auctionitemSaveRes) {
						// Handle Auctionitem save error
						if (auctionitemSaveErr) done(auctionitemSaveErr);

						// Update Auctionitem name
						auctionitem.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Auctionitem
						agent.put('/auctionitems/' + auctionitemSaveRes.body._id)
							.send(auctionitem)
							.expect(200)
							.end(function(auctionitemUpdateErr, auctionitemUpdateRes) {
								// Handle Auctionitem update error
								if (auctionitemUpdateErr) done(auctionitemUpdateErr);

								// Set assertions
								(auctionitemUpdateRes.body._id).should.equal(auctionitemSaveRes.body._id);
								(auctionitemUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Auctionitems if not signed in', function(done) {
		// Create new Auctionitem model instance
		var auctionitemObj = new Auctionitem(auctionitem);

		// Save the Auctionitem
		auctionitemObj.save(function() {
			// Request Auctionitems
			request(app).get('/auctionitems')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Auctionitem if not signed in', function(done) {
		// Create new Auctionitem model instance
		var auctionitemObj = new Auctionitem(auctionitem);

		// Save the Auctionitem
		auctionitemObj.save(function() {
			request(app).get('/auctionitems/' + auctionitemObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', auctionitem.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Auctionitem instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Auctionitem
				agent.post('/auctionitems')
					.send(auctionitem)
					.expect(200)
					.end(function(auctionitemSaveErr, auctionitemSaveRes) {
						// Handle Auctionitem save error
						if (auctionitemSaveErr) done(auctionitemSaveErr);

						// Delete existing Auctionitem
						agent.delete('/auctionitems/' + auctionitemSaveRes.body._id)
							.send(auctionitem)
							.expect(200)
							.end(function(auctionitemDeleteErr, auctionitemDeleteRes) {
								// Handle Auctionitem error error
								if (auctionitemDeleteErr) done(auctionitemDeleteErr);

								// Set assertions
								(auctionitemDeleteRes.body._id).should.equal(auctionitemSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Auctionitem instance if not signed in', function(done) {
		// Set Auctionitem user 
		auctionitem.user = user;

		// Create new Auctionitem model instance
		var auctionitemObj = new Auctionitem(auctionitem);

		// Save the Auctionitem
		auctionitemObj.save(function() {
			// Try deleting Auctionitem
			request(app).delete('/auctionitems/' + auctionitemObj._id)
			.expect(401)
			.end(function(auctionitemDeleteErr, auctionitemDeleteRes) {
				// Set message assertion
				(auctionitemDeleteRes.body.message).should.match('User is not logged in');

				// Handle Auctionitem error error
				done(auctionitemDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Auctionitem.remove().exec();
		done();
	});
});