const express = require('express');
const bodyParser = require('body-parser')
const User = require('../models/user.model')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const router = express.Router();
// router.use(bodyParser.urlencoded({extended: false}));
// router.use(bodyParser.json());
// const config = require('../config')

exports.register = (req, res)=>{
	const hashedPassword = bcrypt.hashSync(req.body.password, 8);
	
}
