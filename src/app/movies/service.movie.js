const Movie = require('./model.movie');

const services = {};

services.get = async () => {
	return await Movie.find().sort({ title: 1 });
};

services.getById = async id => {
	return await Movie.findById(id);
};

services.create = async (title, numberInStock, dailyRentalRate, genre) => {
	const movie = await new Movie({
		title,
		numberInStock,
		dailyRentalRate,
		genre
	}, new { new: true });

	return await movie.save();
};

services.remove = async (id) => {
	return await Movie.findByIdAndRemove(id);
}

module.exports = services;
