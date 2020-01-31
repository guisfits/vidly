const express = require("express");
const rentalService = require("./service.rental");
const customerService = require("./../customers/service.customer");
const movieService = require("./../movies/service.movie");
const router = express.Router();

router.get("/", async (req, res) => {
	const rentals = await rentalService.get();
	res.send(rentals);
});

router.post("/", async (req, res) => {
	const customer = await customerService.getById(req.body.customerId);
	if (!customer)
		return res.status(404).send("The Customer with the given id was not found");

	const movie = await movieService.getById(req.body.movieId);
	if (!movie)
		return res.status(404).send("The Movie with the given id was not found");

	if (movie.numberInStock === 0)
		return res.status(400).send("Movie not in stock");

	const rental = await rentalService.create(customer, movie);

	movie.numberInStock--;
	movie.save();

	res.send(rental);
});
