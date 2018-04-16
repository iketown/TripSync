const { Leg } = require('../models/leg.model')
const { User } = require('../models/user.model');
const { Location } = require('../models/location.model');
const { Trip } = require('../models/trip.model');
const Moment = require('moment')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.addLegToTrip =  async (req, res) => {
	try {
		const leg = new Leg()
		const { company, flightNum, type, startMoment, endMoment, startLoc, endLoc, travelers } = req.body
		if (travelers.length) leg.travelers = travelers.map(trav => ObjectId(trav._id))
		leg._id = ObjectId()
		leg.company = company
		leg.type = type
		leg.flightNum = flightNum
		leg.startLoc = startLoc
		leg.endLoc = endLoc
		leg.adminId = ObjectId(req.user._id)
		leg.startMoment = startMoment
		leg.endMoment = endMoment
		leg.tripId = ObjectId(req.params.tripId)
		await leg.save()
		const updatedTrip = await Trip.findByIdAndUpdate(req.params.tripId, {$push: {tripLegs: leg._id}}, {new: true})
				// .populate({path: 'tripEvents', populate: {path: 'users'}})
				.populate({path: 'tripLegs', populate: {path: 'travelers'}})
		
		res.status(200).json(updatedTrip)

	} catch(e) {
		console.log(e);
	}

}

exports.updateLegUsers = async (req, res)=>{
	const travelers = req.body.map(id => ObjectId(id))
	// const updateObj = {travelers}
	// const updateObj = {}
	const leg = await Leg.findById(req.params.legId)
	leg.travelers = travelers
	const updatedLeg = await leg.save()
	res.json(updatedLeg)
}
exports.updateLeg = async(req,res)=>{
		const leg = await Leg.findById(req.params.legId)
	const { company, flightNum, type, startMoment, endMoment, startLoc, endLoc } = req.body
		leg.company = company
		leg.type = type
		leg.flightNum = flightNum
		leg.startLoc = startLoc
		leg.endLoc = endLoc
		leg.startMoment = startMoment
		leg.endMoment = endMoment
		leg.adminId = ObjectId(req.user._id)
		leg.tripId = ObjectId(req.params.tripId)
		await leg.save()
		res.status(200).send(leg)
}

exports.createLeg = async (req, res) => {
	console.log('req.body', req.body)
	let leg = new Leg()
	const {type, flightNum, company, startDate, startTime, endDate, endTime } = req.body
	leg.type = type
	leg.flightNum = flightNum
	leg.company = company
	leg.adminId = ObjectId(req.user._id)
	leg.startTime = Moment(startDate+"-"+startTime, "YYYY-MM-DD-HH:mm")
	leg.endTime = Moment(endDate+"-"+endTime, "YYYY-MM-DD-HH:mm")
	// res.status(200).send('a-ok')
	}
exports.getLegs = async (req, res)=>{
	const legs = await Leg.find()
	res.json(legs)
}
exports.getLeg = async(req, res)=>{
	const leg = await Leg.findById(req.params.id).populate('travelers').populate('startLoc').populate('endLoc')
	res.json(leg)
}
exports.deleteLeg = async(req, res)=>{
	await Leg.findByIdAndRemove(req.params.legId)
	res.status(200).send('leg deleted')
}



const pretendLeg = {
	company: {
		logoUrl: "https://images.kiwi.com/airlines/64/AA.png",
		name: "American Airlines", 
		abbr: "AA"
	},
	type: "flight",
	flightNum: "2356",
	start: {
		locationId: "jklfsjasdkfnasdf",
		lat: 44.8819722,
		lng: -93.2217778,
		shortName: 'MSP',
		longName: "Minneapolis-St Paul International Airport"
	},
	end: {
		locationId: "jsdlfkjsd;lfkjsdj",
		lat: 33.9424944,
		lng: -118.4080472,
		shortName: 'LAX',
		fullName: "Los Angeles International Airport"
	},
	travelers: []
}




