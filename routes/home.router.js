const express = require('express');
const passport = require('passport');
const router = require('express-promise-router')(); // wraps routes with try/catch blocks
const homeController = require('../controllers/home.controller')

const jwtAuth = passport.authenticate('jwt', {
	session: false
})

router.get('/', homeController.home)

module.exports = router