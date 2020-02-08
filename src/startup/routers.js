const express = require("express");

const genres = require("../app/genres/routers.genres");
const customers = require("../app/customers/routers.customer");
const movie = require("../app/movies/routers.movie");
const rentals = require("../app/rentals/routers.rental");
const users = require("../app/users/routers.user");
const accounts = require("../app/accounts/routers.account");
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
