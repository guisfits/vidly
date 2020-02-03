const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/infra")();
require("./startup/logging")();
require("./startup/database")();
require("./startup/routers")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
