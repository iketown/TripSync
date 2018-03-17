const mongoose = require('mongoose');
// require('mongoose-moment')(mongoose);
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const GroupSchema = Schema({
	name: {type: String, required: true},
	mainAdmin: {type: Schema.Types.ObjectId, ref: 'User'},
	travelers: [{type: Schema.Types.ObjectId, ref: 'User'}]
})



const Group = mongoose.model('Group', GroupSchema)

module.exports = { Group }