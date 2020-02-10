const winston = require("winston");
const express = require("express");
const app = express();

require("./src/startup/infra")();
require("./src/startup/logging")();
require("./src/startup/database")();
require("./src/startup/routers")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
	winston.info(`Listening on port ${port}...`)
);

module.exports = server;
