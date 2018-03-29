const express = require('express');
const router = express.Router()
const usersController = require('../controllers/users.controller')
const {catchErrors} = require('../handlers/errorHandlers')
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {
	session: false,
	failureRedirect: '/auth/login'
})
const loginAuth = passport.authenticate('local', {
	successRedirect: '/admin/users',
	failureRedirect: '/auth/login',
	failureFlash: true
})


router.post('/', catchErrors(usersController.createUser))
router.get('/', jwtAuth, catchErrors(usersController.getUsers))
router.post('/:id',  catchErrors(usersController.updateUser))
router.get('/new', catchErrors(usersController.newUser))
router.get('/store', jwtAuth, catchErrors(usersController.fillStore))
router.get('/:id/edit', catchErrors(usersController.editUser))
router.get('/:id/delete', catchErrors(usersController.deleteUser))
router.get('/:id', catchErrors(usersController.showUser))





module.exports = router