const express = require('express');
const router = express.Router()
const usersController = require('../controllers/users.controller')
const {catchErrors} = require('../handlers/errorHandlers')
const passport = require('passport');

const localAuth = passport.authenticate('local', {session: false});
const jwtAuth = passport.authenticate('jwt', {session: false})
const loginAuth = passport.authenticate('local', {
	successRedirect: '/admin/users',
	failureRedirect: '/auth/login',
	failureFlash: true
})


router.post('/', catchErrors(usersController.createUser))
router.post('/:id',  catchErrors(usersController.updateUser))
router.get('/new', catchErrors(usersController.newUser))
router.get('/', loginAuth, catchErrors(usersController.getUsers))
router.get('/:id/edit', catchErrors(usersController.editUser))
router.get('/:id/delete', catchErrors(usersController.deleteUser))
router.get('/:id', catchErrors(usersController.showUser))





module.exports = router