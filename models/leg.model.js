const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
// const id = mongoose.Types.ObjectId('string')




const LegSchema = Schema({
	_id: Schema.Types.ObjectId,
	company: {
		logoUrl: String,
		name: String,
		abbr: String
	},
	type: { type: String, required: true },
	flightNum: String,
	start: {
		// locationId: ObjectId,
		lat: Number,
		lng: Number,
		shortName: String,
		longName: String,
	},
	end: {
		// locationId: ObjectId,
		lat: Number,
		lng: Number,
		shortName: String,
		longName: String,
	},
	travelers: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Leg = mongoose.model('Leg', LegSchema);

module.exports = { Leg }