const { User } = require('../models/user.model')
const { Trip } = require('../models/trip.model')
const { Group } = require('../models/group.model')
const { Leg } = require('../models/leg.model')
const ObjectId = require('mongoose').Types.ObjectId

exports.home = async (req,res)=>{
	const user = req.user;
	res.render('adminHome', {user})
}

exports.travelers = async (req,res)=>{
	const user = req.user
	
	res.render('travelers', {user})
}