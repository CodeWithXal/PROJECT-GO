require("dotenv").config();
const { signup, signin } = require("../controllers/authController")
const { Router } = require("express");

const authRouter = Router();
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

module.exports = { authRouter };
