const express = require('express');
const bodyParser = require('body-parser')
const { User } = require('../models/user.model')
const {JWT_SECRET} = require('../config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const router = express.Router();
// router.use(bodyParser.urlencoded({extended: false}));
// router.use(bodyParser.json());
// const config = require('../config')

exports.register = async (req, res)=>{
	const hashedPassword = bcrypt.hashSync(req.body.password, 8);
	const newUser = new User(req.body)
	newUser.hashedPassword = hashedPassword
	await newUser.save()
	const payload = {id: newUser._id, email: newUser.email}

	const token = jwt.sign(payload, JWT_SECRET, {
		expiresIn: 86400 // expires in 24 hrs
	})
	res.status(200).send({auth: true, token: token})
}

// exports.decode = (req, res)=>{
// 	const token = req.headers['x-access-token'];
// 	if(!token) return res.status(401).send({auth: false, message: 'no token provided'});

// 	jwt.verify(token, process.env.SECRET, function(err, decoded){
// 		if(err) return res.status(500).send({auth: false, message: 'Failed to authenticate token'})
// 		res.status(200).send(decoded)
// 	})
// }

exports.getToken = async (req,res)=>{
	if (req.body.email && req.body.password) {
		const {email, password} = req.body
		const user = await User.findOne({email: email})
		if (!user) return res.status(401).send('never heard of them.')

		const validated = await user.validatePassword(password)
			console.log('user validated?', validated)
		if(!validated) return res.status(401).send('invalid user/password combo')
		const payload = {id: user._id, email: user.email}
		const token = jwt.sign(payload, JWT_SECRET, {expiresIn: 86400});
		res.json({auth: true, token: token})
	} else {
		res.status(401).send('needs email and password')
	}
}

exports.loginPage = (req, res)=>{
	res.render('login')  // add attempted page to this somehow so it can redirect??
}