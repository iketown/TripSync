const express = require('express');
const router = express.Router()
const tripsController = (require('../controllers/trips.controller'))

router.post('/', tripsController.createTrip)
router.get('/', tripsController.getTrips)
router.get('/:id', tripsController.getTrip)
router.put('/:id', tripsController.updateTrip)
router.delete('/:id', tripsController.deleteTrip)



module.exports = router