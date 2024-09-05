const { Router } = require("express");
const controller = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/", controller.createUser);
userRouter.get("/", controller.getUsers);
userRouter.get("/:id", controller.getUser);

module.exports = userRouter;
