const service = require("./service.genres");
const authMiddeware = require("../../middlewares/auth.middleware");
const adminMiddeware = require("../../middlewares/admin.middeware");
const validateObjectId = require("../../middlewares/validateObjectId.middleware");

const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const genres = await service.getGenres();
	res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
	const genre = await service.getGenreById(req.params.id);
	if (!genre)
		return res.status(404).send("The genre with the given ID was not found.");

	res.send(genre);
});

router.post("/", authMiddeware, async (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await service.createGenre(req.body.name);
	res.send(genre);
});

router.put("/:id", async (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await service.updateGenre(req.params.id, req.body.name);
	if (!genre)
		return res.status(404).send("The genre with the given ID was not found");

	res.send(genre);
});

router.delete("/:id", [authMiddeware, adminMiddeware], async (req, res) => {
	const genre = await service.removeGenre(req.params.id);
	if (!genre)
		return res.status(404).send("The genre with the given ID was not found");

	res.send(genre);
});

function validateGenre(genre) {
	const schema = {
		name: Joi.string()
			.min(3)
			.required()
	};

	return Joi.validate(genre, schema);
}

module.exports = router;
