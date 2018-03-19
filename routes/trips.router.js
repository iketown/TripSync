const express = require('express');
const router = express.Router()
const tripsController = (require('../controllers/trips.controller'))
const {catchErrors} = require('../handlers/errorHandlers')

router.post('/', catchErrors(tripsController.createTrip))
router.post('/:id', catchErrors(tripsController.updateTrip))
router.get('/', catchErrors(tripsController.getTrips)) // get all
router.get('/new', catchErrors(tripsController.newTrip) )  // display form for new one
router.get('/:id', catchErrors(tripsController.showTrip)) // get one
router.get('/:id/edit', tripsController.editTrip)



module.exports = router