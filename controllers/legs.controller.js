const { Leg } = require('../models/leg.model')
const { User } = require('../models/user.model');
const { Location } = require('../models/location.model');
const { Trip } = require('../models/trip.model');
const Moment = require('moment')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.addLegToTrip =  async (req, res) => {
	// return res.send('no bueno')
	try {
		const startLoc = new Location(req.body.startLoc)
		startLoc._id = ObjectId()
		const endLoc = new Location(req.body.endLoc)
		endLoc._id = ObjectId()
		const leg = new Leg()
		const { company, flightNum, type, startDate, startTime, endDate, endTime } = req.body
		leg._id = ObjectId()
		leg.company = company
		leg.flightNum = flightNum
		leg.type = type
		leg.adminId = ObjectId(req.user._id)
		leg.startTime = Moment(startDate+"-"+startTime, "YYYY-MM-DD-HH:mm")
		leg.endTime = Moment(endDate+"-"+endTime, "YYYY-MM-DD-HH:mm")
		leg.startLoc = ObjectId(startLoc._id)
		leg.endLoc = ObjectId(endLoc._id)
		leg.tripId = ObjectId(req.params.tripId)
		const [startLocUpdate, endLocUpdate, legUpdate, tripUpdate] = await Promise.all([
			startLoc.save(),
			endLoc.save(),
			leg.save(),
			Trip.findByIdAndUpdate(req.params.tripId, {$push: {tripLegs: leg._id}}, {new: true})
				.populate({path: 'tripEvents', populate: {path: 'users'}})
				.populate({path: 'tripLegs', populate: {path: 'travelers'}})
				.populate({path: 'tripLegs', populate: {path: 'startLoc'}})
				.populate({path: 'tripLegs', populate: {path: 'endLoc'}})
			])
		res.status(200).json(tripUpdate)

	} catch(e) {
		console.log(e);
	}

}
exports.updateLegUsers = async (req, res)=>{
	console.log('req.body', req.body)
	const travelers = req.body.map(id => ObjectId(id))
	// const updateObj = {travelers}
	// const updateObj = {}
	const leg = await Leg.findById(req.params.id)
	leg.travelers = travelers
	const updatedLeg = await leg.save()
	console.log('leg from controller', leg)
	res.json(updatedLeg)
}
exports.updateLeg = async(req,res)=>{
	try {const updatedLeg = await Leg.findByIdAndUpdate(req.params.legId, req.body)
		res.status(200).json(updatedLeg)} catch(e){console.log(e)}
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
exports.deleteLeg = (req, res)=>{
	res.send('hi from delete LEG')
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




