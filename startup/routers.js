const express = require("express");

const genres = require("../src/genres/routers.genres");
const customers = require("../src/customers/routers.customer");
const movie = require("../src/movies/routers.movie");
const rentals = require("../src/rentals/routers.rental");
const users = require("../src/users/routers.user");
const accounts = require("../src/accounts/routers.account");
const errorMiddleware = require("../middlewares/error.middleware");

module.exports = function(app) {
	app.use(express.json());

	app.use("/api/genres", genres);
	app.use("/api/customers", customers);
	app.use("/api/movies", movie);
	app.use("/api/rentals", rentals);
	app.use("/api/users", users);
	app.use("/api/accounts", accounts);

	app.use(errorMiddleware);
};
