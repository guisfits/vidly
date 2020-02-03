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

	winston.add(winston.transports.File, { filename: "logfile.log" });

	winston.add(winston.transports.Console, {
		colorize: true,
		pretty: true
	});

	winston.add(winston.transports.MongoDB, {
		db: "mongodb://localhost/vidly",
		level: "info"
	});
};
