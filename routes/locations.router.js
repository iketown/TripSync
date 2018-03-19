const express = require('express');
const router = express.Router()
const locationsController = require('../controllers/locations.controller')
const {catchErrors} = require('../handlers/errorHandlers')

router.post('/', catchErrors(locationsController.createLocation))
router.post('/:id', catchErrors(locationsController.updateLocation))
router.get('/', catchErrors(locationsController.getLocations)) // get all
router.get('/new', catchErrors(locationsController.newLocation) )  // display form for new one
router.get('/:id', catchErrors(locationsController.showLocation)) // get one
router.get('/:id/edit', locationsController.editLocation)

// router.get('/:id', catchErrors(locationsController.getLocation))
router.put('/:id', catchErrors(locationsController.updateLocation))
router.get('/:id/delete', catchErrors(locationsController.deleteLocation))



module.exports = router