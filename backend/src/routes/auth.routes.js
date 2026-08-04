import express from "express";
import {signup, login, logout} from "../controllers/auth.controller.js";
import {signupSchema, loginSchema} from "../validations/auth.validation.js";
import {validate} from "../middleware/validate.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { getCurrentUser } from "../controllers/auth.controller.js";

const router = express.Router();




router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getCurrentUser);

export default router;