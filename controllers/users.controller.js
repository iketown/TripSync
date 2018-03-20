const { User } = require('../models/user.model')
const { Group } = require('../models/group.model')
const { Leg } = require('../models/leg.model')
const ObjectId = require('mongoose').Types.ObjectId

exports.createUser = async (req,res) => {
		const user = await User.create(req.body)
		const users = await User.find()
		res.render('users', {users, title: 'Users'})
}

exports.getUsers = async (req,res)=>{
	const users = await User.find()
	res.render('users', {users, title: 'Users'})
}
exports.newUser = async (req, res)=>{
	const users = await User.find()
	res.render('editUser', {users})
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
exports.updateUser = async (req,res)=>{
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
	const users = await User.find();
	req.flash('success', 'hey')
	res.render('editUser', {user, users});
}
exports.deleteUser = async (req,res)=>{
	await User.findByIdAndRemove(req.params.id)
	const users = await User.find();
	res.render('users', {users, title: 'Users'})
}


exports.sign_in = function(req,res){
	
}
exports.loginRequired = function(req,res){

}
