const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const userService = require("./../users/service.user");

const router = express.Router();

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await userService.get(req.body.email);
	if (!user) return res.status(400).send("Invalid email or password.");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send("Invalid email or password.");

	const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
	res.send(token);
});

function validate(req) {
	const schema = {
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
	};

	return Joi.validate(req, schema);
}

module.exports = router;