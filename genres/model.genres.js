const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	}
});

const Genre = mongoose.model("Genre", genreSchema);

exports.genreSchema = genreSchema;
exports.Genre = Genre;
