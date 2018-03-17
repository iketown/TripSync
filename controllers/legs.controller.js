const { Leg } = require('../models/leg.model')
const { User } = require('../models/user.model');
const Moment = require('moment')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.createLeg = async (req, res) => {
	const leg = await new Leg()
	leg._id = new ObjectId()
	leg.company = req.body.company
	leg.type = req.body.type
	leg.flightNum = req.body.flightNum
	leg.startLoc = ObjectId(req.body.startLocId);
	leg.endLoc = ObjectId(req.body.endLocId);
	leg.startTime = new Moment('2018-03-06')
	leg.endTime = new Moment('2018-03-07')
	const travelers = [];
	for (i in req.body.travelerIds){
		travelers.push(ObjectId(req.body.travelerIds[i]))
	}
	leg.travelers = travelers;
	leg.save((err, leg)=>{
		if (err) return console.log(err)
			res.json(leg)
	})


	}

exports.getLegs = async (req, res)=>{
	const legs = await Leg.find()
	res.json(legs)
}
exports.getLeg = async(req, res)=>{
	const leg = await Leg.findById(req.params.id).populate('travelers').populate('startLoc').populate('endLoc')
	res.json(leg)
}
exports.updateLeg = async (req, res)=>{
	if(req.body._id !== req.params.id){
		return res.status(400).send('ids must match')
	}
	// const updatableFields = []
	
	const leg = await Leg.findById(req.params.id)
	let travelers = []
	for (i in req.body.travelerIds){
		travelers.push(ObjectId(req.body.travelerIds[i]))
	}
	if (req.body.startLocId) leg.startLoc = ObjectId(req.body.startLocId);
	if (req.body.endLocId) leg.endLoc = ObjectId(req.body.endLocId);
	if (travelers.length) leg.travelers = travelers;
	if (req.body.startTimeString) leg.startTime = Moment(req.body.startTimeString)
	if (req.body.endTimeString) leg.endTime = Moment(req.body.endTimeString)
	leg.save()
	
	res.status(204).end();

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




