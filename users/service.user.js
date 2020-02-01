const bcrypt = require('bcrypt');
const { User } = require('./model.user');

const services = {};

services.get = async (email) => {
	return await User.findOne({ email: email });
}

services.createUser = async (name, email, password) => {
	password = await hashPassword(password);

	const user = new User({
		name,
		email,
		password
	});

	return await user.save();
};

async function hashPassword(password) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

module.exports = services;
