require("express-async-errors");
require("winston-mongodb");
const dateFormat = require("dateformat");
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

	const date = new Date();
	const dateString = dateFormat(date, "yyyy_mmm_dd");

	winston.add(
		new winston.transports.File({
			filename: `vidly-${dateString}.log`
		})
	);

	winston.add(
		new winston.transports.Console({
			colorize: true,
			pretty: true
		})
	);

	// winston.add(
	// 	new winston.transports.MongoDB({
	// 		db: "mongodb://localhost/vidly",
	// 		level: "info"
	// 	})
	// );
};
