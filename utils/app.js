const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("../routes");
const setupSwagger = require("./swagger");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(routes);

// set up swagger
setupSwagger(app);

module.exports = app;
