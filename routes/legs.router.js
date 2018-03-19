const express = require('express');
const router = express.Router()
const legsController = require('../controllers/legs.controller') 


router.post('/', legsController.createLeg)
router.post('/:id', legsController.updateLeg)

router.get('/', legsController.getLegs)
router.get('/:id', legsController.getLeg)
router.put('/:id', legsController.updateLeg)
router.delete('/:id', legsController.deleteLeg)



module.exports = router