const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const GroupSchema = Schema({
	name: {type: String, required: true},
	mainAdmin: {type: Schema.Types.ObjectId, ref: 'mainAdmin'},
	travelers: [{type: Schema.Types.ObjectId, ref: 'User'}]
})



const Group = mongoose.model('Group', GroupSchema)

module.exports = { Group }