const { Router } = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const accountRouter = require("./account.route");
const transactionRouter = require("./transaction.route");

const routes = Router();

routes.use("/api/v1/auth", authRouter);
routes.use("/api/v1/users", jwtAuth, userRouter);
routes.use("/api/v1/accounts", jwtAuth, accountRouter);
routes.use("/api/v1/transactions", jwtAuth, transactionRouter);

module.exports = routes;
