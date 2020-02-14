/* eslint-disable no-undef */
const request = require("supertest");
const { Genre } = require("../../src/app/genres/model.genres");
const { User } = require("../../src/app/users/model.user");

describe("/api/genres", () => {
	let server;

	beforeEach(() => {
		server = require("../../index");
	});

	afterEach(async () => {
		await server.close();
		await Genre.remove({});
	});

	describe("GET /", () => {
		it("should return all genres", async () => {
			await Genre.collection.insertMany([
				{ name: "Thrash Metal" },
				{ name: "Punk Rock" },
				{ name: "Hard-Core" }
			]);

			const res = await request(server).get("/api/genres");

			expect(res.status).toBe(200);
			expect(res.body.length).toBe(3);
			expect(res.body.some(g => g.name === "Punk Rock")).toBeTruthy();
		});
	});

	describe("GET /:id", () => {
		it("should return one genre if valid id is passed", async () => {
			const genre = new Genre({ name: "Thrash Metal" });
			await genre.save();

			const res = await request(server).get("/api/genres/" + genre._id);

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("name", genre.name);
		});

		it("should return 404 if invalid id is passed", async () => {
			const res = await request(server).get("/api/genres/0");
			expect(res.status).toBe(404);
		});
	});

	describe("POST /", () => {
		let token;
		let name;

		beforeEach(() => {
			token = new User().generateAuthToken();
			name = "myTestGenre";
		});

		const exec = async () => {
			return await request(server)
				.post("/api/genres")
				.set("x-auth-token", token)
				.send({ name });
		};

		it("should return 401 if client is not logged in", async () => {
			// Arrange
			token = "";

			// Act
			const res = await exec();

			// Assert
			expect(res.status).toBe(401);
		});

		it("should return 400 if genre is less than 5 characters", async () => {
			// Arrange
			name = "a";

			// Act
			const res = await exec();

			// Assert
			expect(res.status).toBe(400);
		});

		it("should save the genre if it is valid", async () => {
			// Act
			const res = await exec();
			const genre = await Genre.find({ name: "myTestGenre" });

			// Assert
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("_id");
			expect(res.body).toHaveProperty("name", "myTestGenre");
			expect(genre).not.toBeNull();
		});
	});
});
