// const express = require('express');
// const bodyParser = require('body-parser')
const { User } = require('../models/user.model')
const { Trip } = require('../models/trip.model')
const {JWT_SECRET, JWT_EXPIRY} = require('../config')
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId


const signToken = (user)=>{
	return JWT.sign({
		iss: 'iketown',
		sub: user.id,
		iat: new Date().getTime(),
		expiresIn: JWT_EXPIRY  

	}, JWT_SECRET)
}

exports.signUp = async(req, res)=>{
	console.log('hi from signup')
	const {email, password, firstName, lastName} = req.body;
	// check that the email isn't already taken
	const foundUser = await User.findOne({email});
	if(foundUser) return res.status(403).json({error: 'email already registered'})
	// create user in database
	const newUser = new User({email, password, firstName, lastName})
	await newUser.save()

	// return token
	const token = signToken(newUser)
	res.cookie('jwt-auth', token); 
	res.status(200).send(newUser)
}

exports.signIn = async (req, res)=>{
	// validation is handled by passport local strategy
	// req.user will already have the user on it by now.
	const token = signToken(req.user)
	const myTrips = await Trip.find({adminId: ObjectId(req.user._id)})
		.populate('tripLegs')
	const me = await User.findById(req.user._id)
		.populate({path: 'travelers'})
		.populate({path: 'trips', populate: {path: 'tripLegs'}})
	res.cookie('jwt-auth', token)
	res.status(200).send({me, myTrips})
}

exports.signOut = (req, res)=>{
	res.clearCookie("jwt-auth");
	res.redirect('/')
}
