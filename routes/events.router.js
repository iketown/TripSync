const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller')
const {catchErrors} = require('../handlers/errorHandlers')

router.post('/', catchErrors(eventsController.createEvent))
router.post('/:id', catchErrors(eventsController.updateEvent))
router.get('/', catchErrors(eventsController.getEvents)) // get all
router.get('/new', catchErrors(eventsController.newEvent) )  // display form for new one
router.get('/store', eventsController.fillStore)
router.get('/:id', catchErrors(eventsController.showEvent)) // get one
router.get('/:id/edit', eventsController.editEvent)
router.get('/:id/delete', eventsController.deleteEvent)







module.exports = router