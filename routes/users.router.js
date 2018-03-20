const express = require('express');
const router = express.Router()
const usersController = require('../controllers/users.controller')
const {catchErrors} = require('../handlers/errorHandlers')

router.post('/', catchErrors(usersController.createUser))
router.post('/:id',  catchErrors(usersController.updateUser))
router.get('/new', catchErrors(usersController.newUser))
router.get('/', catchErrors(usersController.getUsers))
router.get('/:id/edit', catchErrors(usersController.editUser))
router.get('/:id/delete', catchErrors(usersController.deleteUser))
router.get('/:id', catchErrors(usersController.showUser))





module.exports = router