const { Trip } = require('../models/trip.model')
const { Leg } = require('../models/leg.model')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


exports.getMyTrips = async(req, res)=>{
	const trips = await Trip.find( {adminId: req.user.id} )
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
	res.json(trips)
}
exports.createTrip = async (req, res)=>{
	newTrip = new Trip()
	newTrip.adminId = ObjectId(req.user.id)
	newTrip.name = req.body.tripName
	await newTrip.save()
	const trips = await Trip.find( {adminId: req.user.id} )
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
	res.json({trips, newTrip})
} 
exports.updateTrip = async(req,res)=>{
	const newTrip = await Trip.findById(req.params.id)
	newTrip.name = req.body.tripName
	await newTrip.save()
	const trips = await Trip.find( {adminId: req.user.id} )
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
	res.json({trips, newTrip})

}
exports.deleteTrip = async(req,res)=>{
	const tripId = req.params.tripId
	await Trip.findByIdAndRemove(tripId)
	const trips = await Trip.find( {adminId: req.user.id} )
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})

	res.json(trips)
}

