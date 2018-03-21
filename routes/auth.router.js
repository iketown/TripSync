const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = express.Router()
const authController = require('../controllers/auth.controller')
const {catchErrors} = require('../handlers/errorHandlers')
const usersController = require('../controllers/users.controller')

const localAuth = passport.authenticate('local', {session: false});
const loginAuth = passport.authenticate('local', {
	successRedirect: '/admin/users',
	failureRedirect: '/auth/login',
	failureFlash: true,
	session: false
})

router.post('/token', catchErrors(authController.getToken))
router.post('/register', catchErrors(authController.register))
router.post('/login', loginAuth, usersController.getUsers)
router.get('/login', authController.loginPage)
// router.get('/me', catchErrors(authController.decode))




module.exports = router