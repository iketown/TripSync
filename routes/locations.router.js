const express = require('express');
const router = express.Router()
const locationsController = require('../controllers/locations.controller')

router.get('/', locationsController.getLocations)
router.post('/', locationsController.createLocation)
router.get('/:id', locationsController.getLocation)
router.put('/:id', locationsController.updateLocation)
router.delete('/:id', locationsController.deleteLocation)



module.exports = router