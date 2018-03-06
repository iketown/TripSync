const { Leg } = require('../models/leg.model')
const { User } = require('../models/user.model');
const moment = require('moment')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.createLeg = async (req, res) => {
	const {company, type, flightNum, start, end, users} = req.body
	const leg = await  Leg.create({company, type, flightNum, start, end, users})
		res.json(leg);
	}

exports.getLegs = async (req, res)=>{
	const legs = await Leg.find()
	res.json(legs)
}
exports.getLeg = async(req, res)=>{
	const leg = await Leg.findById(req.params.id).populate('travelers')
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
	// const users = await User.find().where('_id').in(travelerObjIds)
	leg.travelers = travelers;
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




