const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const fields = {
	name : String,
	email : String,
	gender : String,
	dob : Date,
	username : String,
	notification: {
		type: Schema.Types.Boolean,
		default: true
	},
	notificationTime: {
		type: Schema.Types.String,
		default: "08"
	}
}

let UserSchema = new Schema(fields, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
