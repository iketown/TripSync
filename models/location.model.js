const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema


const LocationSchema = Schema({
	name: {type: String, required: true},
	lat: Number,
	lng: Number,
	address: String,
	city: String,
	state: String,
	zip: String,
	phone: String,
	place_id: String,
	utcOffset: Number,
	contact1: {
		name: String,
		phone: String,
		email: String
	},
	contact2: {
		name: String,
		phone: String,
		email: String
	},
	contact3: {
		name: String,
		phone: String,
		email: String
	}
})

const Location = mongoose.model('Location', LocationSchema)

module.exports = { Location }