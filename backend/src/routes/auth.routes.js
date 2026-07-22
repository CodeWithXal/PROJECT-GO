import express from "express";
import {signup, login} from "../controllers/auth.controller.js";
import {signupSchema, loginSchema} from "../validations/auth.validation.js";
import {validate} from "../middleware/validate.middleware.js";

const router = express.Router();




router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;