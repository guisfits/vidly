/* eslint-disable no-undef */
const moment = require("moment");
const Rental = require("../../src/app/rentals/model.rental");
const { User } = require("../../src/app/users/model.user");
const Movie = require("../../src/app/movies/model.movie");
const mongoose = require("mongoose");
const request = require("supertest");

describe("/api/returns", () => {
	let server;
	let customerId;
	let movieId;
	let rental;
	let movie;
	let token;

	beforeEach(async () => {
		server = require("../../index");

		customerId = mongoose.Types.ObjectId();
		movieId = mongoose.Types.ObjectId();
		token = new User().generateAuthToken();

		movie = new Movie({
			_id: movieId,
			title: "12345",
			dailyRentalRate: 2,
			genre: { name: "12345" },
			numberInStock: 10
		});

		rental = new Rental({
			customer: {
				_id: customerId,
				name: "12345",
				phone: "12345"
			},
			movie: {
				_id: movieId,
				title: "12345",
				dailyRentalRate: 2
			}
		});

		await movie.save();
		await rental.save();
	});

	afterEach(async () => {
		await server.close();
		await Rental.remove({});
		await Movie.remove({});
	});

	const exec = async () => {
		return await request(server)
			.post("/api/returns")
			.set("x-auth-token", token)
			.send({ movieId, customerId });
	};

	it("should work", async () => {
		const savedRental = await Rental.findById(rental._id);
		expect(savedRental).not.toBeNull();
	});

	it("should return 401 if client is not logged in", async () => {
		token = "";
		const res = await exec();
		expect(res.status).toBe(401);
	});

	it("should return 400 if customerId is not provided", async () => {
		customerId = "";
		const res = await exec();
		expect(res.status).toBe(400);
	});

	it("should return 400 if movieId is not provided", async () => {
		movieId = "";
		const res = await exec();
		expect(res.status).toBe(400);
	});

	it("should return 404 if no rental found for this customer/movie", async () => {
		await Rental.remove({});
		const res = await exec();
		expect(res.status).toBe(404);
	});

	it("should return 400 if return is already processed", async () => {
		rental.dateReturned = new Date();
		await rental.save();

		const res = await exec();

		expect(res.status).toBe(400);
	});

	it("should return 200 if we have a valid request", async () => {
		await rental.save();
		const res = await exec();
		expect(res.status).toBe(200);
	});

	it("should set the returnDate if input is valid", async () => {
		await exec();
		const rentalInDb = await Rental.findById(rental._id);
		const currentTime = new Date();
		expect(currentTime - rentalInDb.dateReturned).toBeLessThan(10 * 1000);
	});

	it("should set the rentalFee if input is valid", async () => {
		rental.dateOut = moment()
			.add(-7, "days")
			.toDate();
		await rental.save();

		await exec();

		const rentalInDb = await Rental.findById(rental._id);
		expect(rentalInDb.rentalFee).toBe(14);
	});

	it("should increase the movie stock if input is valid", async () => {
		await exec();
		const movieInDb = await Movie.findById(movieId);
		expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
	});

	it("should return the rental on the body of response", async () => {
		const res = await exec();
		expect(res.body).toHaveProperty("dateOut");
		expect(res.body).toHaveProperty("dateReturned");
		expect(res.body).toHaveProperty("rentalFee");
		expect(res.body).toHaveProperty("customer");
		expect(res.body).toHaveProperty("movie");
	});
});
