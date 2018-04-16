const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const moment = require('moment')

const TripSchema = Schema({
	name: {type: String},
	tripLegs: [{type: Schema.Types.ObjectId, ref: 'Leg'}],
	adminId: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Trip = mongoose.model('Trip', TripSchema)

module.exports = { Trip }
