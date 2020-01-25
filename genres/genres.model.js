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

module.exports = mongoose.model("Genre", genreSchema);
