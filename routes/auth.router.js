const express = require('express');
const passport = require('passport');
const router = require('express-promise-router')(); // wraps routes with try/catch blocks
const authController = require('../controllers/auth.controller')
const {validateBody, schemas} = require('../helpers/routerHelpers')
// const {localStrategy, jwtStrategy } = require('../auth')


router.get('/signup', authController.signUpPage)
router.post('/signup', validateBody(schemas.authSchema), authController.signUp)
router.post('/signin', validateBody(schemas.authSchema), passport.authenticate('local', {session: false}), authController.signIn)
router.get('/login', authController.loginPage)
router.get('/signout', authController.signOut)

module.exports = router