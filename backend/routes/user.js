const { Router } = require("express");
const userRouter = Router();
const jwt_secret = process.env.JWT_AUTH_SECRET;
const { authMiddleware } = require("../middleware/auth_Middleware");
const { completeProfile, showProfile, myProfile } = require("../controllers/userController");
const userAuth = authMiddleware(jwt_secret);
const { verifyClerkToken } = require("../middleware/clerkMiddleware");

userRouter.put("/complete-profile", userAuth, completeProfile);
userRouter.get("/my-profile", userAuth, showProfile);
userRouter.get("/me", userAuth, myProfile);

module.exports = { userRouter };
