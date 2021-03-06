const moment = require("moment");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: {
				type: String,
				required: true,
				minlength: 5,
				maxlength: 50
			},
			isGold: {
				type: Boolean,
				default: false
			},
			phone: {
				type: String,
				required: true,
				minlength: 5,
				maxlength: 50
			}
		}),
		required: true
	},
	movie: {
		type: new mongoose.Schema({
			title: {
				type: String,
				required: true,
				trim: true,
				minlength: 5,
				maxlength: 255
			},
			dailyRentalRate: {
				type: Number,
				required: true,
				min: 0,
				MAX: 255
			}
		}),
		required: true
	},
	dateOut: {
		type: Date,
		required: true,
		default: Date.now
	},
	dateReturned: {
		type: Date
	},
	rentalFee: {
		type: Number,
		min: 0
	}
});


rentalSchema.methods.numberOfDaysOut = function() {
	return moment().diff(this.dateOut, "days");
};

rentalSchema.methods.return = function() {
	this.dateReturned = new Date();
	this.rentalFee = this.movie.dailyRentalRate * this.numberOfDaysOut();
}

module.exports = mongoose.model("Rental", rentalSchema);
