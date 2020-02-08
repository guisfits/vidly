const { Genre } = require("./model.genres");

const service = {};

service.getGenres = async () => {
	return await Genre.find().sort({ name: 1 });
};

service.getGenreById = async id => {
	return await Genre.findById(id);
};

service.createGenre = async name => {
	const genre = new Genre({
		name: name
	});

	return await genre.save();
};

service.updateGenre = async (id, name) => {
	return await Genre.findByIdAndUpdate(id, { name: name }, { new: true });
};

service.removeGenre = async id => {
	return await Genre.findByIdAndRemove(id);
};

module.exports = service;
