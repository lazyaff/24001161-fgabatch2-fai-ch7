const { Router } = require("express");
const controller = require("../controllers/account.controller");

const accountRouter = Router();

accountRouter.post("/", controller.createAccount);
accountRouter.get("/", controller.getAccounts);
accountRouter.get("/:id", controller.getAccount);

module.exports = accountRouter;
