// Imports
const debug = require("debug")("app:startup");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// Midlewares
app.use(express.json());

mongoose
	.connect("mongodb://localhost/vidly", {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => debug("Connected to MongoDb..."))
	.catch(err => debug("Could not connect to MongoDb", err));

// Routes
const genres = require("./genres/routers.genres");
const customers = require("./customers/routers.customer");

app.use("/api/genres", genres);
app.use("/api/customers", customers);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));
