const { Event, Group, Leg, Location, Trip, User } = require('../models')

const getAll = async ()=>{
	const eventsP =  Event.find()
	const groupsP =  Group.find().populate('travelers')
	const legsP =  Leg.find().populate('travelers').populate('endLoc').populate('startLoc')
	const locationsP =  Location.find()
	const tripsP =  Trip.find()
		.populate({path: 'tripEvents', populate: {path: 'users'}})
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
		.populate({path: 'tripLegs', populate: {path: 'startLoc'}})
		.populate({path: 'tripLegs', populate: {path: 'endLoc'}})
	const usersP =  User.find()
	const [events, groups, legs, locations, trips, users] = await Promise.all([eventsP, groupsP, legsP, locationsP, tripsP, usersP])
	return {events, groups, legs, locations, trips, users}
}

exports.home = async (req, res)=>{
	if (req.user){
		res.render('adminHome')
	} else {
		console.time('time')
		res.render('home')
		console.timeEnd('time')
	}
}

exports.jshome = async(req, res)=>{
	user = req.user
	const tripsP =  Trip.findOne({adminID: user.id })
		.populate({path: 'tripEvents', populate: {path: 'users'}})
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
		.populate({path: 'tripLegs', populate: {path: 'startLoc'}})
		.populate({path: 'tripLegs', populate: {path: 'endLoc'}})
	const usersP =  User.find()
}

exports.examplePage = async (req,res)=>{
	const user = req.user
	const eventsP =  Event.find()
	const groupsP =  Group.find().populate('travelers')
	const legsP =  Leg.find().populate('travelers').populate('endLoc').populate('startLoc')
	const locationsP =  Location.find()
	const tripsP =  Trip.find().populate('tripLegs').populate('tripEvents').populate('legs')
	const usersP =  User.find()
	const [events, groups, legs, locations, trips, users] = await Promise.all([eventsP, groupsP, legsP, locationsP, tripsP, usersP])
	res.render('examplePage', {user, events, groups, legs, locations, trips, users})
}

exports.getAll = getAll

exports.fillStore = async (req,res)=>{
	const eventsP =  Event.find()
	const groupsP =  Group.find().populate('travelers')
	const legsP =  Leg.find().populate('travelers').populate('endLoc').populate('startLoc')
	const locationsP =  Location.find()
	const tripsP =  Trip.find().populate('tripLegs').populate('tripEvents').populate('legs')
	const usersP =  User.find()
	const [events, groups, legs, locations, trips, users] = await Promise.all([eventsP, groupsP, legsP, locationsP, tripsP, usersP])
	console.log('user is', req.user)
	res.json({events, groups, legs, locations, trips, users})
}