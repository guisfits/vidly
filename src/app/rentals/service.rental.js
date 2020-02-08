const Rental = require("./model.rental");

const services = {};

services.get = async () => {
	return await Rental.find().sort("-dateOut");
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
