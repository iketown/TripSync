const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller')
const {catchErrors} = require('../handlers/errorHandlers')
const passport = require('passport');

// passport auth middleware
const localAuth = passport.authenticate('local', {session: false});
const jwtAuth = passport.authenticate('jwt', {session: false})

router.get('/',  catchErrors(eventsController.getEvents)) // get all
router.post('/', catchErrors(eventsController.createEvent))
router.post('/:id', catchErrors(eventsController.updateEvent))
router.get('/new', catchErrors(eventsController.newEvent) )  // display form for new one
router.get('/store', eventsController.fillStore)
router.get('/:id', catchErrors(eventsController.showEvent)) // get one
router.get('/:id/edit', eventsController.editEvent)
router.get('/:id/delete', eventsController.deleteEvent)







module.exports = router