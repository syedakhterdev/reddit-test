const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const fields = {
	title : {
		type: Schema.Types.String,
		required: true
	},
	description :{
		type: Schema.Types.String,
	},
	votes : {
		type: Schema.Types.Number,
		default: 0
	},
	subRedditId : {
		type: Schema.Types.ObjectId,
		ref: 'SubReddit'
   }
}

let PostSchema = new Schema(fields, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
