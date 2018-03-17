const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('mongoose-moment')(mongoose);

const Schema = mongoose.Schema;
const moment = require('moment')
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
	startLoc: {type: Schema.Types.ObjectId, ref: "Location"},
	endLoc: {type: Schema.Types.ObjectId, ref: "Location"},
	startTime: 'Moment',
	endTime: 'Moment',
	travelers: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Leg = mongoose.model('Leg', LegSchema);

module.exports = { Leg }