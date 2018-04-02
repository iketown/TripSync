const express = require('express');
const passport = require('passport');
const router = require('express-promise-router')(); // wraps routes with try/catch blocks
const authController = require('../controllers/auth.controller')
const {validateBody, schemas} = require('../helpers/routerHelpers')
// const {localStrategy, jwtStrategy } = require('../auth')

const localAuth = passport.authenticate('local', {
	session: false,
	failureRedirect: '/'
})

router.post('/signin', localAuth , authController.signIn)
router.post('/signup', authController.signUp)
router.get('/signout', authController.signOut)
// router.get('/signup', authController.signUpPage)
// router.get('/login', authController.loginPage)

module.exports = router