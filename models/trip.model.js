const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const moment = require('moment')

const TripSchema = Schema({
	name: {type: String, required: true},
	tripLegs: [{type: Schema.Types.ObjectId, ref: 'Leg'}],
	tripEvents: [{type: Schema.Types.ObjectId, ref: 'Event'}],
	adminId: {type: Schema.Types.ObjectId, ref: 'User'}
})

// sort legs by start time and get the earliest start Date.
// sort legs by end time and get the latest end Date.



const Trip = mongoose.model('Trip', TripSchema)

module.exports = { Trip }