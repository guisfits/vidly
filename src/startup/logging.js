require("express-async-errors");
require("winston-mongodb");
const winston = require("winston");

module.exports = function() {
	process.on("uncaughtException", ex => {
		winston.error(ex.message, ex);
		process.exit(1);
	});

	process.on("unhandledRejection", ex => {
		winston.error(ex.message, ex);
		process.exit(1);
	});

	winston.add(
		new winston.transports.File({ filename: `vidly-${Date.now()}.log` })
	);

	winston.add(
		new winston.transports.Console({
			colorize: true,
			pretty: true
		})
	);

	winston.add(
		new winston.transports.MongoDB({
			db: "mongodb://localhost/vidly",
			level: "info"
		})
	);
};
