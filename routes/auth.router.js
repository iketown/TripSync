const express = require('express');
const router = express.Router()
const authController = require('../controllers/auth.controller')
const {catchErrors} = require('../handlers/errorHandlers')

router.post('/register', catchErrors(authController.register))



module.exports = router