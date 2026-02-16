const {Router} = require("express");
const userRouter = Router();
const jwt_secret = process.env.JWT_AUTH_SECRET;
const {authMiddleware} = require("../middleware/auth_Middleware");
const { completeProfile } = require("../controllers/userController");
const {showProfile} = require("../controllers/userController")
const userAuth = authMiddleware(jwt_secret);


userRouter.put("/complete-profile", userAuth, completeProfile);
userRouter.get("/my-profile", userAuth, showProfile);




module.exports = {userRouter}

