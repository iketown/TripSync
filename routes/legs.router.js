const express = require('express');
const router = express.Router()
const legsController = require('../controllers/legs.controller') 
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {session: false})

// router.post('/', legsController.createLeg)
router.post('/addLegToTrip/:tripId', jwtAuth, legsController.addLegToTrip)
router.post('/updateUsers/:id', jwtAuth, legsController.updateLegUsers)
router.post('/:id', legsController.updateLeg)
// router.post('/addLegToTrip/:id', legsController.updateLeg)

// router.get('/', legsController.getLegs)
// router.get('/:id', legsController.getLeg)
// router.post('/:id', legsController.updateLeg)
// router.delete('/:id', legsController.deleteLeg)



module.exports = router