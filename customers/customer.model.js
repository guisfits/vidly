const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
	isGold: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 150,
		trim: true
	},
	phone: {
		type: String,
		minlength: 8,
		maxlength: 20,
		trim: true
	}
});

module.exports = mongoose.model("Customer", customerSchema);
