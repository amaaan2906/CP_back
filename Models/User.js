const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255,
	},
	username: {
		type: String,
		required: true,
		min: 5,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 1024,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		min: 9,
		max: 9,
		required: true,
	},
	registerDate: {
		type: Number,
		default: Date.now,
	},
	verified: {
		type: Boolean,
		require: true,
		default: false,
	},
});

module.exports = mongoose.model("User", userModel);
