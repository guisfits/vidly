const express = require("express");
const movieService = require("./service.movie");
const genreService = require("../genres/service.genres");
const router = express.Router();

router.get("/", async (req, res) => {
	const movies = await movieService.get();
	res.send(movies);
});

router.get("/:id", async (req, res) => {
	const movie = await movieService.getById(req.params.id);
	res.send(movie);
});

router.post("/", async (req, res) => {
	const genre = await genreService.getGenreById(req.body.genreId);
	if (!genre)
		return res.status(404).send("Genre with the given ID was not found");

	const movie = await movieService.create(
		req.body.title,
		req.body.numberInStock,
		req.body.dailyRentalRate,
		new Genre({ _id: genre._id, name: genre.name })
	);

	res.send(movie);
});

router.put("/:id", async (req, res) => {
	const movie = await movieService.update(
		req.params.id,
		req.body.title,
		req.body.numberInStock,
		req.body.dailyRentalRate,
		req.body.Genre
	);

	res.send(movie);
});

router.delete("/:id", async (req, res) => {
	const movie = await movieService.remove(req.params.id);
	res.send(movie);
});

module.exports = router;
