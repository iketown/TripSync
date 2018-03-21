const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar');

const UserSchema = Schema({
	// _id: Schema.Types.ObjectId,
	admin: Boolean,
	firstName: String,
	lastName: String,
	userName: String,
	email: {type: String, lowercase: true, required: true, unique: true, index: true},
	hashedPassword: {
		type: String,
		required: true
	},
	phone: String,
	homeAirport: String,
	prefAirlines: Array
})

UserSchema.methods.validatePassword = function(password){
	return bcrypt.compare(password, this.hashedPassword)
}
UserSchema.statics.hashPassword = function(password){
	return bcrypt.hash(password, 10);
}

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