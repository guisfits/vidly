const debug = require("debug")("app:startup");
const mongoose = require("mongoose");
const genres = require("./genres/genres.routes");
const express = require("express");
const app = express();

mongoose
	.connect("mongodb://localhost/vidly", {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => debug("Connected to MongoDb..."))
	.catch(err => debug("Could not connect to MongoDb", err));

app.use(express.json());
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));
