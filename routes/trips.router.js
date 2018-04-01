const express = require('express');
const router = express.Router()
const tripsController = (require('../controllers/trips.controller'))
const {catchErrors} = require('../handlers/errorHandlers')

router.get('/', catchErrors(tripsController.getMyTrips)) // get all
router.post('/', catchErrors(tripsController.createTrip))
router.post('/:id', catchErrors(tripsController.updateTrip))
router.delete('/:tripId', catchErrors(tripsController.deleteTrip))
// router.get('/new', catchErrors(tripsController.newTrip) )  // display form for new one
// router.get('/store', catchErrors(tripsController.fillStore) )  // display form for new one
// router.get('/:id', catchErrors(tripsController.getTrip)) // get one
// router.get('/:id/trips', catchErrors(tripsController.getMyTrips))
// router.get('/:id/show', catchErrors(tripsController.showTrip)) // get one
// router.get('/:id/edit', tripsController.editTrip)



module.exports = router