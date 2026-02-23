require("dotenv").config();
const { clerkLogin } = require("../controllers/authController");
const { verifyClerkToken } = require("../middleware/clerkMiddleware");
const { Router } = require("express");

const authRouter = Router();
authRouter.post("/clerk-login", verifyClerkToken, clerkLogin);

module.exports = { authRouter };
