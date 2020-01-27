const express = require("express");
const service = require("./customers.service");

const router = express.Router();

router.get("/", async (req, res) => {
	const customers = await service.getCustomers();
	res.send(customers);
});

router.get("/:id", async (req, res) => {
	const customer = await service.getCustomerById(req.params.id);
	if (!customer)
		return res.status(404).send("The customer with the given ID was not found.");

	res.send(customer);
});

router.post("/", async (req, res) => {
	const customer = await service.createCustomer(req.body.name);
	res.send(customer);
});

router.put("/:id", async (req, res) => {
	const customer = await service.updateCustomer(req.params.id, req.body.name);
	if (!customer)
		return res.status(404).send("The customer with the given ID was not found");

	res.send(customer);
});

router.delete("/:id", async (req, res) => {
	const customer = await service.removeCustomer(req.params.id);
	if (!customer)
		return res.status(404).send("The customer with the given ID was not found");

	res.send(customer);
});

module.exports = router;
