const { Event } = require('../models/event.model')
const { Location } = require('../models/location.model')
const { Leg } = require('../models/leg.model')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const moment = require('moment')

exports.createEvent = async(req, res)=>{
	const event = new Event(req.body)
	event.startDateTime = moment(`${req.body.startDate} ${req.body.startTime}`)
	event.location = ObjectId(req.body.locationId)
	await event.save()
	const events = await Event.find()
	res.redirect('/admin/events')
}

exports.updateEvent = async(req, res)=> {
	const event = await Event.findById(req.params.id)
	event.startDateTime = moment(`${req.body.startDate} ${req.body.startTime}`)
	event.location = ObjectId(req.body.locationId)
	await event.save()
	const events = await Event.find()
	res.redirect('/admin/events')
}
exports.getEvents = async(req, res)=> {
	const events = await Event.find()
	res.render('events', { events })
}

exports.newEvent = async (req, res)=>{
	const eventsPromise =  Event.find()
	const locationsPromise =  Location.find()
	const [events, locations] = await Promise.all([eventsPromise, locationsPromise])
	res.render('editEvent', {events, locations})
}

exports.showEvent = async (req, res)=>{
	const eventP = Event.findById(req.params.id)
	const eventsP = Event.find()
	const [event, events] = await Promise.all([eventP, eventsP])
	res.render('showEvent', {event, events})
}

exports.editEvent = async (req, res)=>{
	const eventsPromise =  Event.find()
	const eventPromise = Event.findById(req.params.id).populate('location')
	const locationsPromise =  Location.find()
	const [event, events, locations] = await Promise.all([eventPromise, eventsPromise, locationsPromise])
	res.render('editEvent', {event, events, locations})
}
exports.deleteEvent = async (req, res)=>{
	await Event.findByIdAndRemove(req.params.id)
	const events = await Event.find()
	res.redirect('/admin/events')
}