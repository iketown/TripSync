const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('mongoose-moment')(mongoose);

const Schema = mongoose.Schema;
const moment = require('moment')
// const id = mongoose.Types.ObjectId('string')




const LegSchema = Schema({
	_id: Schema.Types.ObjectId,
	company: String,
	type: String,
	flightNum: String,
	startLoc: {
		address: String,
		city: String,
		cityLong: String,
		state: String,
		name: String,
		lat: Number,
		lng: Number,
		googlePlaceId: String,
		utcOffset: Number,
		placeName: String
	},
	endLoc: {
		address: String,
		city: String,
		cityLong: String,
		state: String,
		name: String,
		lat: Number,
		lng: Number,
		googlePlaceId: String,
		utcOffset: Number,
		placeName: String,
	},
	startMoment: 'Moment',
	endMoment: 'Moment',
	travelers: [{type: Schema.Types.ObjectId, ref: 'User'}],
	adminId: {type: Schema.Types.ObjectId, ref: 'User'},
	tripId: {type: Schema.Types.ObjectId, ref: 'Trip'}
});

const Leg = mongoose.model('Leg', LegSchema);

module.exports = { Leg }