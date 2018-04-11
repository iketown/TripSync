const express = require('express');
const passport = require('passport');
const router = require('express-promise-router')(); // wraps routes with try/catch blocks
const authController = require('../controllers/auth.controller')
const {
	validateBody,
	schemas
} = require('../helpers/routerHelpers')

const localAuth = passport.authenticate('local', {
	session: false,
})

router.post('/signin', localAuth, authController.signIn)
router.post('/signup', authController.signUp)
router.get('/signout', authController.signOut)

module.exports = router