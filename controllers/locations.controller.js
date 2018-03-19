const { Location } = require('../models/location.model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

exports.createLocation = async (req,res)=>{
	const location = await Location.create(req.body)
	const locations = await Location.find()
	res.render('locations', {locations} )
}

exports.newLocation = async (req, res) => {
	const locations = await Location.find()
	res.render('editLocation', {locations, title: 'New Location'})
}
exports.editLocation = async (req, res)=>{
	const location = await Location.findById(req.params.id)
	const locations = await Location.find()
	// const [location, locations] = await Promise.all([locationPromise, locationsPromise])
	console.log('location', location)
	res.render('editLocation', {location, locations})
}
exports.showLocation = async (req,res)=>{
	const locationPromise = Location.findById(req.params.id)
	const locationsPromise = Location.find()
	const [location, locations] = await Promise.all([locationPromise, locationsPromise])
	res.render('showLocation', {locations, location, title: location.name})
}
exports.getLocations = async (req,res)=>{
	const locations = await Location.find()
	res.render('locations', { locations })
}
exports.updateLocation = async (req,res)=>{
	const location = await  Location.findByIdAndUpdate(req.params.id, req.body, {new: true})
	const locations = await Location.find()
	res.render('showLocation', {location, locations})
	// if(req.body.id !== req.params.id){
	// 	return res.status(400).send('ids must match')
	// }
	// const update = req.body
	// await Location.findByIdAndUpdate(
	// 		req.params.id,
	// 		update, 
	// 		{new:true},
	// 		(err, loc)=>{
	// 			res.status(200).json(loc)
	// 		}
	// 	)
}

exports.deleteLocation = async (req,res)=>{
	await Location.findByIdAndRemove(req.params.id);
	res.status(204).end();
}

