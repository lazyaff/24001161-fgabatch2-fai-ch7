// require("./sentry.js");

const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('../routes');
const setupSwagger = require('./swagger');
const Sentry = require('@sentry/node');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(cors());

// set up swagger
setupSwagger(app);

// // set up sentry
// Sentry.setupExpressErrorHandler(app);

// // Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//     res.statusCode = 500;
//     res.end(res.sentry + "\n");
// });

module.exports = app;
