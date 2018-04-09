const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const {TEST_DATABASE_URL} = require('../config');
const faker = require('faker')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const {app, runServer, closeServer} = require('../server')
const {User} = require('../models/user.model')


const testUsers = []

function seedUsers(){
	for(let i=0;i<10;i++){ testUsers.push( createUser() ) }
	return User.insertMany(testUsers)
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
function makeTravelerIdList(){
	const travelerIdList = testUsers.map( testUsers => ObjectId(user._id) )
	return travelerIdList
}


describe('TripSync API', function(){
	before(function(){
		return runServer(TEST_DATABASE_URL);
	});
	beforeEach(function(){
		return
	})
	afterEach(function(){
		return
	})
	after(function(){
		return tearDownDb()
		return closeServer()
	})
	describe('ADMIN user', function(){
		let admin = createUser();
		const agent = chai.request.agent(app)
		let trip;
		let leg;
		let traveler;
		it('should sign up', function(){
			return agent.post('/auth/signup')
				.send(admin)
				.then(function(res){
					expect(res).to.have.status(200)
					expect(res).to.have.cookie('jwt-auth')
					admin._id = res.body._id
				}, err=>console.log('errormessage', err.message))
		})
		it('should sign in', function(){
			return agent.post('/auth/signin')
				.send(admin)
				.then(function(res){
					expect(res).to.have.status(200)
				})
		})
		it('should create a trip', function(){
			return agent.post('/admin/trips')
				.send({tripName: 'Orlando'})
				.then(function(res){
					expect(res).to.have.status(200);
					expect(res).to.be.json
					trip = res.body.trips[0]
				})
		})
		it('should add a leg to trip', function(){
			const newLeg = {company: 'Southwest', flightNum: '1234', type: 'Flight'};
			return agent.post(`/admin/legs/addLegToTrip/${trip._id}`)
				.send(newLeg)
				.then(function(res){
					leg = res.body.tripLegs[0]
					expect(leg).to.have.property('_id')
					expect(leg).to.have.property('company', 'Southwest')
					expect(leg).to.have.property('type', 'Flight')
					expect(leg).to.have.property('flightNum', '1234')
					expect(leg).to.have.property('adminId', admin._id)
					expect(leg).to.have.property('tripId', trip._id)
				})
		})
		it('should create a traveler (user)', function(){
			const newUser = createUser()
			return agent.post('/admin/users/')
				.send(newUser)
				.then(function(res){
					traveler = res.body.travelers[0]
				})
		})
		it('should Update a traveler(user)', function(){
			return agent.post(`/admin/users/${traveler._id}`)
				.send({firstName: 'BlarfBlarf'})
				.then(function(res){
					const updatedTraveler = res.body.travelers[0]
					expect(updatedTraveler.firstName).to.equal('BlarfBlarf')
					expect(updatedTraveler._id).to.equal(traveler._id)
				})
		})
		it('should add a Traveler to a Leg', function(){
			return agent.post(`/admin/legs/updateUsers/${leg._id}`)
				.send([traveler._id])
				.then(function(res){
					const updatedLeg = res.body
					expect(updatedLeg.travelers[0]).to.equal(traveler._id)
					expect(updatedLeg.adminId).to.equal(admin._id)
					expect(updatedLeg.tripId).to.equal(trip._id)
				})
		})
		it('should remove a traveler from a Leg', function(){
			return agent.post(`/admin/legs/updateUsers/${leg._id}`)
				.send([])
				.then(function(res){
					expect(res.body.travelers.length).to.equal(0)
				})
		})
	})
	


});


