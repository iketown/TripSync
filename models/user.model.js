const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const UserSchema = Schema({
	// _id: Schema.Types.ObjectId,
	admin: Boolean,
	firstName: String,
	lastName: String,
	userName: String,
	email: {type: String, required: true, unique: true, index: true},
	phone: String,
	homeAirport: String,
	prefAirlines: Array
})

const User = mongoose.model('User', UserSchema);

module.exports = { User }