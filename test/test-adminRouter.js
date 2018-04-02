const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const {app} = require('../server')
const {TEST_DATABASE_URL} = require('../config');
const faker = require('faker')


function seedUsers(){
	console.info('seeding users')
	const usersSeed = []

	for(let i=0 ;i<10 ;i++){
		usersSeed.push(createUserFake())
	}
}
function createUserFake(){
	return {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email()
	}
}

describe('admin router', function(){
	// before, create admin user
	
	// move cookie to a more global scope.

	// after, destroy database



})