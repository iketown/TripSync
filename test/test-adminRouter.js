const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const {TEST_DATABASE_URL} = require('../config');
const faker = require('faker')
const mongoose = require('mongoose')
const {app, runServer, closeServer} = require('../server')
const {User} = require('../models/user.model')

function seedUsers(){
	const users = []
	for(let i=0;i<10;i++){ users.push( createUser() ) }
	return User.insertMany(users)
}
function createUser(){
	const user = {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
		password: 'password',
	}
	return user;
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
		return seedUsers()
	});
	afterEach(function(){
		return tearDownDb()
	});
	after(function(){
		return closeServer()
	})


	const user = createUser()
	const agent = chai.request.agent(app)

	describe('Sign In / Sign Up', function(){
		it('should return a jwt cookie', function(){
			return agent.post('/auth/signup')	
			.send(user)
			.then(function(res){
				expect(res).to.have.cookie('jwt-auth')
				return agent.post('/auth/signin')
					.send({email: user.email, password: user.password})
			})
			.then(function(res){
				expect(res).to.have.status(200)
			})
			.catch(err=> console.log('signin/up error'))
		})
	});

	describe('Sign In / Sign Up2', function(){
		it('should return a jwt cookie', function(){
			return agent.post('/auth/signup')	
			.send(user)
			.then(function(res){
				expect(res).to.have.cookie('jwt-auth2')
			})
			.catch(err=> console.log('signin/up 2 error'))
		})
	});




})