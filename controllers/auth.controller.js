const express = require('express');
const bodyParser = require('body-parser')
const { User } = require('../models/user.model')
const { getAll } = require('./home.controller')
const {JWT_SECRET, JWT_EXPIRY} = require('../config')
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const router = express.Router();
// router.use(bodyParser.urlencoded({extended: false}));
// router.use(bodyParser.json());
// const config = require('../config')

const signToken = (user)=>{
	return JWT.sign({
		iss: 'iketown',
		sub: user.id,
		iat: new Date().getTime(),
		expiresIn: JWT_EXPIRY  // exp in 24 hrs.

	}, JWT_SECRET)
}

exports.signUp = async(req, res)=>{
	console.log('hi from signup')
	const {email, password} = req.body;
	// check that the email isn't already taken
	const foundUser = await User.findOne({email});
	if(foundUser) return res.status(403).json({error: 'email already registered'})
	// create user in database
	const newUser = new User({email, password})
	await newUser.save()

	// return token
	const token = signToken(newUser)
	res.cookie('jwt-auth', token); 
	res.render('adminHome', {user: newUser})
}

exports.signIn = async (req, res)=>{
	// validation is handled by passport local strategy
	// req.user will already have the user on it by now.
	const token = signToken(req.user)
	res.cookie('jwt-auth', token)
	res.render('adminHome', {user: req.user})
}

exports.signOut = (req, res)=>{
	res.clearCookie("jwt-auth");
	res.render('home')
}

exports.loginPage = (req, res)=>{
	console.log('req.path',req.path)
	res.render('login', {attemptedPath: req.path})
}
exports.signUpPage = async (req, res)=>{
	res.render('signUp')
}