const {Group} = require('../models/group.model')
const {User} = require('../models/user.model')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.createGroup = async (req, res) => {
	const { name, mainAdmin, travelerIds } = req.body
	const group = new Group({name})
	const travelers = [];
	for (i in req.body.travelerIds){
		travelers.push(ObjectId(req.body.travelerIds[i]))
	}
	group.travelers = travelers
	await group.save()
	res.json(group)
}

exports.getGroups = async(req, res) => {
	const allGroups = await Group.find()
	res.json(allGroups)
}

exports.getGroup = async(req, res) => {
	const id = req.params.id
	const group = await Group.findById(id).populate('travelers');
	res.json(group)
}

exports.deleteGroup = async (req, res) => {
	await Group.findByIdAndRemove(req.params.id)
	console.log(req.params.id)
	res.status(204).end()
}

exports.updateGroup = async (req, res)=> {
	if(req.params.id !== req.body._id){
		return res.status(400).send('ids must match')
	}
	const travelers = []
	for (i in req.body.travelerIds){
		travelers.push(ObjectId(req.body.travelerIds[i]))
	}
	const {name, mainAdmin } = req.body
	const update = {name, mainAdmin, travelers}
	await Group.findByIdAndUpdate(req.params.id, update)
		res.status(204).end()
}