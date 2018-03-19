const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
const gravatar = require('gravatar');

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

UserSchema.virtual('fullName').get( function(){
	return this.firstName +' ' + this.lastName
})

UserSchema.virtual('gravatarUrl').get(function(){
	return gravatar.url(this.email, {s: '200'})
})

UserSchema.methods.serialize = function(){
	return {
		name: `${firstName} ${lastName}`,
		username,
		email,
		phone
	}
}

const User = mongoose.model('User', UserSchema);

module.exports = { User }