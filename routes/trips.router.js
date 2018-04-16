const express = require('express');
const router = express.Router()
const tripsController = (require('../controllers/trips.controller'))
const {
	catchErrors
} = require('../handlers/errorHandlers')

router.get('/', catchErrors(tripsController.getMyTrips)) 
router.post('/', catchErrors(tripsController.createTrip))
router.post('/:id', catchErrors(tripsController.updateTrip))
router.delete('/:tripId', catchErrors(tripsController.deleteTrip))

module.exports = router