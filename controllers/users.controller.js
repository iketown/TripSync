const { User } = require('../models/user.model')
const { Trip } = require('../models/trip.model')
const { Group } = require('../models/group.model')
const { Leg } = require('../models/leg.model')
const ObjectId = require('mongoose').Types.ObjectId

exports.createUser = async (req,res) => {
		const {email, firstName, lastName, avatar} = req.body
		const password = req.body.password || 'tripsyncpassword'
		// console.log('from create user', {email, firstName, lastName, avatar, password})
		const newUser = new User({email, firstName, lastName, avatar, password})
		try {
			await newUser.save()
			await User.findByIdAndUpdate(req.user.id, {$addToSet: {travelers: ObjectId(newUser.id)}})
			const myUsers = await User.findById(req.user.id).select('travelers').populate('travelers')
			return res.status(200).json(myUsers)
		} catch(e) {
			return res.json(e)
		}
}
exports.updateUser = async (req,res)=>{
	console.log('req.body from updateUser', req.body)
	await User.findByIdAndUpdate(req.params.id, req.body)
	const myUsers = await User.findById(req.user.id).select('travelers').populate('travelers')
	res.status(200).json(myUsers)
}
exports.newUser = async (req, res)=>{
	const users = await User.find()
	res.render('editUser', {users})
}
exports.getUsers = async (req,res)=>{
	const myUsers = await User.findById(req.user.id).select('travelers').populate('travelers')
	res.status(200).json(myUsers)
}

exports.showUser = async(req,res)=>{
	const usersP = User.find()
	const userP =  User.findById(req.params.id)
	const [users, user] = await Promise.all([usersP, userP])
	res.render('showUser', {users, user, title: `${user.fullName}`})
}

exports.editUser = async(req,res)=>{
	const userPromise =  User.findById(req.params.id);
	const usersPromise = User.find();
	const [user, users] = await Promise.all([userPromise, usersPromise])
	const userId = ObjectId(req.params.id)
	// what legs is this person in?  also include others on that leg
	const legs = await Leg.find({travelers: userId}).populate({path: 'travelers', select: 'firstName lastName _id'})
	res.render('editUser', {title: `Edit ${user.firstName} ${user.lastName}`, user, users, legs})
}
exports.deleteUser = async (req,res)=>{
	await User.findByIdAndRemove(req.params.id)
	const users = await User.find();
	res.render('users', {users, title: 'Users'})
}
exports.fillStore = async function(req,res){
	console.log('hi from fillStore')
	const meProm =  User.findById(req.user._id)
		.populate('travelers')
	const myTripsProm =  Trip.find({adminId: req.user._id})
	const [me, myTrips] = await Promise.all([meProm, myTripsProm])
	me.password = ''
	res.status(200).json({me, myTrips});

}

exports.sign_in = function(req,res){
	
}
exports.loginRequired = function(req,res){

}
