'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Onestopshopper = mongoose.model('Onestopshopper');

/**
 * Globals
 */
var user, onestopshopper;

/**
 * Unit tests
 */
describe('Onestopshopper Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			onestopshopper = new Onestopshopper({
				name: 'Onestopshopper Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return onestopshopper.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			onestopshopper.name = '';

			return onestopshopper.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Onestopshopper.remove().exec();
		User.remove().exec();

		done();
	});
});