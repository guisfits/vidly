const service = require("./service.user");
const { validate } = require("./model.user");

const _ = require("lodash");
const config = require("config");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await service.get(req.body.email);
	if (user) return res.status(400).send("User already registered.");

	user = await service.createUser(
		req.body.name,
		req.body.email,
		req.body.password
	);

	const token = user.generateAuthToken();
	const response = _.pick(user, ["name", "email"]);

	res.header("x-auth-token", token).send(response);
});

module.exports = router;
