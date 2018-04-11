const express = require('express');
const router = express.Router()
const legsController = require('../controllers/legs.controller')
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {
	session: false
})

router.post('/addLegToTrip/:tripId', jwtAuth, legsController.addLegToTrip)
router.post('/updateUsers/:legId', jwtAuth, legsController.updateLegUsers)
router.post('/:legId', jwtAuth, legsController.updateLeg)
router.delete('/:legId', jwtAuth, legsController.deleteLeg)


module.exports = router