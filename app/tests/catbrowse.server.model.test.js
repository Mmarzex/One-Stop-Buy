'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Catbrowse = mongoose.model('Catbrowse');

/**
 * Globals
 */
var user, catbrowse;

/**
 * Unit tests
 */
describe('Catbrowse Model Unit Tests:', function() {
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
			catbrowse = new Catbrowse({
				name: 'Catbrowse Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return catbrowse.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			catbrowse.name = '';

			return catbrowse.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Catbrowse.remove().exec();
		User.remove().exec();

		done();
	});
});