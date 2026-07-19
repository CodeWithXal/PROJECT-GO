import express from "express";
import {createUser} from "../controllers/user.controller.js";
import {createUserSchema} from "../validations/user.validation.js";
import {validate} from "../middleware/validate.middleware.js";
const router = express.Router();

router.post("/",validate(createUserSchema),createUser);


export default router;