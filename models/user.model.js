const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const UserSchema = Schema({
	// _id: Schema.Types.ObjectId,
	admin: Boolean,
	firstName: String,
	lastName: String,
	// userName: String,
	email: {type: String, lowercase: true, required: true},
	password: {
		type: String,
		required: true
	},
	avatar: String,
	travelers: [{type: Schema.Types.ObjectId, ref: 'User'}],
	trips: [{type: Schema.Types.ObjectId, ref: 'Trip'}],
})

// automatically hash the password before saving
UserSchema.pre('save', async function(next){
	try {
		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(this.password, salt)
		this.password = passwordHash;
		next();
	} catch(e) {
		next(e)
		console.log(e)
	}
})

UserSchema.methods.validatePassword = async function(password){
	try {
		return await bcrypt.compare(password, this.password) // returns a boolean
	} catch(e) {
		throw new Error(e)
	}
}


UserSchema.virtual('fullName').get( function(){
	return this.firstName +' ' + this.lastName
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