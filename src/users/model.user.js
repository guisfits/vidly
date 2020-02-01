const mongoose = require('mongoose'); 
const Joi = require("joi");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		requried: true,
		minlength: 5,
		maxlength: 50
	}, 
	email: {
		type: String,
		requried: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	}, 
	password: {
		type: String,
		requried: true,
		minlength: 5,
		maxlength: 1024
	}
});

function validateUser(user) {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	}

	return Joi.validate(user, schema);
}

module.exports.User = mongoose.model('User', userSchema);
module.exports.validate = validateUser;
