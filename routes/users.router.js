const express = require('express');
const router = express.Router()
const usersController = require('../controllers/users.controller')
const {
	catchErrors
} = require('../handlers/errorHandlers')
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {})
const loginAuth = passport.authenticate('local', {})


router.post('/', catchErrors(usersController.createUser))
router.post('/:id', catchErrors(usersController.updateUser))
router.delete('/:id', catchErrors(usersController.removeUser))

module.exports = router