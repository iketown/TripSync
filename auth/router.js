'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {JWT_EXPIRY, JWT_SECRET} = require('../config')

const createAuthToken = function(user){
	return jwt.sign({user}, JWT_SECRET, {
		subject: user.username,
		expiresIn: JWT_EXPIRY,
		algorithm: 'HS256'
	});
};

const localAuth = passport.authenticate('local', {session: false});

