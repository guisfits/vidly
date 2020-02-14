const Rental = require("./model.rental");

const services = {};

services.get = async () => {
	return await Rental.find().sort("-dateOut");
};

services.getByCustomerAndMovie = async (customerId, movieId) => {
	return await Rental.findOne({
		"customer._id": customerId,
		"movie._id": movieId
	});
};

services.create = async (customer, movie) => {
	const rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate
		}
	});

	return await rental.save();
};

module.exports = services;
