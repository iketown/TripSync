const { Event, Group, Leg, Location, Trip, User } = require('../models')

exports.home = async (req, res)=>{
	res.render('home')
}

exports.adminHome = async(req,res)=>{
	res.render('adminHome', {user: req.user})
}

