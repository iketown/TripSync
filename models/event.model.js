const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('mongoose-moment')(mongoose)
const Schema = mongoose.Schema
const moment = require('moment')

const eventSchema = Schema({
	name: String,
	location: {type: Schema.Types.ObjectId, ref: 'Location'},
	startDateTime: 'Moment',
	endDateTime: 'Moment'
})