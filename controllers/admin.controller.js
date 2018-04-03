const { User } = require('../models/user.model')
const { Trip } = require('../models/trip.model')
const ObjectId = require('mongoose').Types.ObjectId

exports.home = async (req,res)=>{
	console.log('hi from admin controller')
	const myTrips = await Trip.find({adminId: ObjectId(req.user._id)})
		.populate('tripLegs')
	const me = await User.findById(req.user._id)
		.populate({path: 'travelers'})
		.populate({path: 'trips', populate: {path: 'tripLegs'}})

	res.status(200).send({me, myTrips})
	}
