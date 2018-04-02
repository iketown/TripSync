const { Trip } = require('../models/trip.model')
const { Leg } = require('../models/leg.model')
const { getAll } = require('./home.controller')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


exports.getMyTrips = async(req, res)=>{
	const trips = await Trip.find( {adminId: req.user.id} )
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
	res.json(trips)
}
exports.createTrip = async (req, res)=>{
	console.log(req.body)
	console.log('req.user._id', req.user._id)
	trip = new Trip()
	trip.adminId = ObjectId(req.user.id)
	trip.name = req.body.tripName
	await trip.save()
	const trips = await Trip.find( {adminId: req.user.id} )
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
	res.json(trips)
} 
exports.updateTrip = async(req,res)=>{
	const trip = await Trip.findById(req.params.id)
	trip.name = req.body.tripName
	await trip.save()
	const trips = await Trip.find( {adminId: req.user.id} )
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
	res.json(trips)

}
exports.deleteTrip = async(req,res)=>{
	const tripId = req.params.tripId
	await Trip.findByIdAndRemove(tripId)
	const trips = await Trip.find( {adminId: req.user.id} )
		.populate({path: 'tripLegs', populate: {path: 'travelers'}})

	res.json(trips)
}



// exports.fillStore = async(req, res)=>{
// 	const trips = await Trip.find().populate('tripLegs').populate('tripEvents')
// 	res.json(trips)
// }

// exports.getTrips = async(req, res)=> {
// 	const trips = await Trip.find().populate('tripLegs')
// 	res.render('trips', {trips, title: 'All Trips' })
// }

// exports.showTrip = async (req, res)=>{
// 	const trip = await Trip.findById(req.params.id)
// 		.populate({path: 'tripEvents', populate: {path: 'users'}})
// 		.populate({path: 'tripLegs', populate: {path: 'travelers'}})
// 		.populate({path: 'tripLegs', populate: {path: 'startLoc'}})
// 		.populate({path: 'tripLegs', populate: {path: 'endLoc'}})
// 	const s = await getAll()
// 	res.render('showTrip', {trip, user: req.user, s})
// }
// exports.getTrip = async(req,res)=>{
// 	const trip = await Trip.findById(req.params.id).populate('tripLegs')
// 	console.log(trip)
// 	res.json(trip)
// }
// exports.addLegToTrip = () => {

// }
// exports.editTrip = ()=>{

// }