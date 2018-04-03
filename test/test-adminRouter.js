const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const {TEST_DATABASE_URL} = require('../config');
const faker = require('faker')
const mongoose = require('mongoose')
const {app, runServer, closeServer} = require('../server')


function createAdmin(){
	const admin = {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
		password: 'password',
	}
	return admin;
}
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}


describe('Users API', function(){

	before(function(){
		return runServer(TEST_DATABASE_URL);
	});
	beforeEach(function(){

	});
	afterEach(function(){
		return tearDownDb()
	});
	after(function(){
		return closeServer()
	})


	const admin = createAdmin()
	console.log('admin from test', admin)
	describe('SIGNUP endpoint', function(){
		it('should return a valid user id', function(){
			return chai.request(app)
				.post('/auth/signup')
				.send(admin)
				.then(function(res){
					console.log('response from admin test', res.body)
					expect(res).to.have.status(200)
					expect(res.body).to.include.keys(
						'firstName', 'lastName', 'email', '_id', 'password');
					expect(res).to.have.cookie('jwt-auth')
				})
		})
	})



})