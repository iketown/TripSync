const { User } = require('../models/user.model')
const { Group } = require('../models/group.model')
const { Leg } = require('../models/leg.model')
const ObjectId = require('mongoose').Types.ObjectId

exports.createUser = async (req,res) => {
	const { admin, firstName, lastName, userName, email, 
		phone, homeAirport, prefAirlines } = req.body
		const user = await User.create({ admin, firstName, lastName, userName, email, 
		phone, homeAirport, prefAirlines })
		if(!user){return res.send('hey that did not work')}
		res.json(user)
}

exports.getUsers = async (req,res)=>{
	const users = await User.find()
	res.json(users)
}
exports.getUser = async(req,res)=>{
	const user = await User.findById(req.params.id);
	const userId = ObjectId(req.params.id)
	// what legs is this person in?  also include others on that leg
	const legs = await Leg.find({travelers: userId}).populate({path: 'travelers', select: 'firstName lastName _id'})
	const response = {user, legs}
	res.json(response);
}
exports.updateUser = async (req,res)=>{
	if (req.body._id !== req.params.id){
		res.status(400).send('id in body and request must match')
	}
	await User.findByIdAndUpdate(req.params.id, req.body)
	res.status(204).end()
}
exports.deleteUser = async (req,res)=>{
	await User.findByIdAndRemove(req.params.id)
	res.status(204).end()
}
