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

router.get('/signup', authController.signUpPage)
router.post('/signup', authController.signUp)
router.post('/signin', validateBody(schemas.authSchema), localAuth , authController.signIn)
router.get('/login', authController.loginPage)
router.get('/signout', authController.signOut)

module.exports = router