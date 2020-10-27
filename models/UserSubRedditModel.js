const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const fields = {
	userId : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	subRedditId : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'SubReddit'
	}
}

let UserSubRedditSchema = new Schema(fields, { timestamps: true });

module.exports = mongoose.model('UserSubReddit', UserSubRedditSchema);
