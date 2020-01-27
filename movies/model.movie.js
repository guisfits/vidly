const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./../genres/genres.model");

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 250
	},
	numberInStock: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
		max: 255
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
		max: 255
	},
	genre: {
		type: genreSchema,
		required: true
	}
});

module.exports = mongoose.model("Movie", movieSchema);
