const { Trip } = require('../models/trip.model')
const { Leg } = require('../models/leg.model')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.createTrip = async(req, res)=>{
	const trip = await Trip.create(req.body)
	res.status(201).json(trip)
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

exports.newTrip = ()=>{
	
}
exports.showTrip = ()=>{
	
}
exports.editTrip = ()=>{

}