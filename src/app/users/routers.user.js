const service = require("./service.user");
const { validate } = require("./model.user");
const authMiddeware = require("../../middlewares/auth.middleware");

const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.get("/me", authMiddeware, async (req, res) => {
	const user = await service.getById(req.user._id);
	if (!user) return res.send(404).send("User with the given id was not find");

	res.send(user);
});

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
