const { Trip } = require('../models/trip.model')
const { Leg } = require('../models/leg.model')
const { getAll } = require('./home.controller')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


exports.getMyTrips = async(req, res)=>{
	const trips = await Trip.find( {adminId: req.user.id} )
		.populate({path: 'tripEvents', populate: {path: 'users'}})
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
		.populate({path: 'tripLegs', populate: {path: 'startLoc'}})
		.populate({path: 'tripLegs', populate: {path: 'endLoc'}})

	res.json(trips)
}
exports.newTrip = ()=>{
	
}
exports.createTrip = async (req, res)=>{
	trip = new Trip(req.body)
	console.log('user id', req.user.id)
	trip.adminId = ObjectId(req.user.id)
	await trip.save()
	res.status(200).json(trip)
	
}
exports.fillStore = async(req, res)=>{
	const trips = await Trip.find().populate('tripLegs').populate('tripEvents')
	res.json(trips)
}
exports.updateTrip = async(req, res)=> {
	if ( req.body.id !== req.params.id ){
		return res.status(400).send('id in url and body must match')
		}
	const update = {
		name: req.body.name,
		tripLegs: []
	}
	for (i in req.body.legIds){
		update.tripLegs.push(ObjectId(req.body.legIds[i]))		
	}
	await Trip.findByIdAndUpdate(
		req.params.id,
		update,
		{ new: true },
		(err, trip)=>{
			res.json(trip)
		}
		)
}
exports.getTrips = async(req, res)=> {
	const trips = await Trip.find().populate('tripLegs')
	res.render('trips', {trips, title: 'All Trips' })
}

exports.showTrip = async (req, res)=>{
	const trip = await Trip.findById(req.params.id)
		.populate({path: 'tripEvents', populate: {path: 'users'}})
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
		.populate({path: 'tripLegs', populate: {path: 'startLoc'}})
		.populate({path: 'tripLegs', populate: {path: 'endLoc'}})
	const s = await getAll()
	res.render('showTrip', {trip, user: req.user, s})
}
exports.getTrip = async(req,res)=>{
	const trip = await Trip.findById(req.params.id).populate('tripLegs')
	console.log(trip)
	res.json(trip)
}
exports.addLegToTrip = () => {

}
exports.editTrip = ()=>{

}