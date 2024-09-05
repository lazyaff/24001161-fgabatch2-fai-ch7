const { Router } = require("express");
const controller = require("../controllers/transaction.controller");

const transactionRouter = Router();

transactionRouter.post("/", controller.createTransaction);
transactionRouter.get("/", controller.getTransactions);
transactionRouter.get("/:id", controller.getTransaction);

module.exports = transactionRouter;
