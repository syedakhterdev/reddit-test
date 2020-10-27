const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const fields = {
	name : String,
	description : String
}

let SubRedditSchema = new Schema(fields, { timestamps: true });

module.exports = mongoose.model('SubReddit', SubRedditSchema);
