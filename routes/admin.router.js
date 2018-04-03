const express = require('express');
const passport = require('passport');
const router = require('express-promise-router')(); // wraps routes with try/catch blocks
const adminController = require('../controllers/admin.controller')

const jwtAuth = passport.authenticate('jwt', {
	session: false,
	// failureRedirect: '/auth/login'
})

router.get('/', jwtAuth, adminController.home)
// router.get('/travelers', adminController.travelers)

module.exports = router