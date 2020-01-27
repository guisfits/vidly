const Customer = require('./model.customer');

const service = {};

service.getCustomers = async () => {
	return await Customer.find().sort({ name: 1 });
};

service.getCustomerById = async id => {
	return await Customer.findById(id);
};

service.createCustomer = async name => {
	const customer = new Customer({
		name: name
	});

	return await customer.save();
};

service.updateCustomer = async (id, name) => {
	return await Customer.findByIdAndUpdate(id, { name: name }, { new: true });
};

service.removeCustomer = async id => {
	return await Customer.findByIdAndRemove(id);
};

module.exports = service;
