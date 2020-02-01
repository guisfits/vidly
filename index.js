// Imports
const config = require("config");
const debug = require("debug")("app:startup");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const genres = require("./src/genres/routers.genres");
const customers = require("./src/customers/routers.customer");
const movie = require("./src/movies/routers.movie");
const rentals = require("./src/rentals/routers.rental");
const users = require("./src/users/routers.user");
const accounts = require("./src/accounts/routers.account");

if (!config.get("jwtPrivateKey")) {
	debug("FATAL ERROR: jwtPrivateKey is not defined.");
	process.exit(1);
}

// Midlewares
app.use(express.json());

// DB
mongoose
	.connect("mongodb://localhost/vidly", {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => debug("Connected to MongoDb..."))
	.catch(err => debug("Could not connect to MongoDb", err));

// Routes
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movie);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/accounts", accounts);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));
