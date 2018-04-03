const { Event, Group, Leg, Location, Trip, User } = require('../models')
const path = require('path')

exports.home = async (req, res)=>{
	res.render('home')
}

exports.adminHome = async(req,res)=>{
	res.sendFile( path.join(__dirname, '../public/index.html') )
}

