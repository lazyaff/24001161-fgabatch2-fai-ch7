const { Router } = require("express");
const controller = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/login", controller.login);
authRouter.post("/logout", controller.logout);
authRouter.post("/register", controller.register);
authRouter.post("/verify-otp", controller.verifyOtp);
authRouter.post("/send-token", controller.sendToken);
authRouter.post("/reset-password", controller.resetPassword);
authRouter.get("/check-token", controller.checkHttpOnlyCookie);

module.exports = authRouter;
