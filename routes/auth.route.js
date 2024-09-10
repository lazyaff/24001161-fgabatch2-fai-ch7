const { Router } = require('express');
const controller = require('../controllers/auth.controller');

const authRouter = Router();

authRouter.post('/login', controller.login);
authRouter.post('/logout', controller.logout);
authRouter.post('/register', controller.register);
authRouter.post('/verify-otp', controller.verifyOtp);

module.exports = authRouter;
