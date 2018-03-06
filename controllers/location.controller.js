const { Location } = require('../models/location.model')
const mongoose - require('mongoose');
const ObjectId = mongoose.Types.ObjectId

exports.createLocation = async (req,res)=>{
	const location = await Location.create(req.body)
	res.status(201).json(location)
}
exports.getLocation = async (req,res)=>{
	const location = await Location.findById(req.params.id)
	res.status(200).json(location);
}
exports.getLocations = async (req,res)=>{
	const locations = await Location.find()
	res.status(200).json(locations)
}
exports.updateLocation = async (req,res)=>{
	if(req.body._id !== req.params.id){
		return res.status(400).send('ids must match')
	}
	const update = req.body
	await Location.findByIdAndUpdate(
			req.params.id,
			update, 
			{new:true},
			(err, loc)=>{
				res.status(200).json(loc)
			}
		)
}

exports.deleteLocation = async (req,res)=>{
	await Location.findByIdAndRemove(req.params.id);
	res.status(204).end();
}

