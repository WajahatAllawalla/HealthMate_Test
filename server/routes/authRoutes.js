import express from "express";
import { signin, signup, verifyEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/verify-email/:token", verifyEmail);

export default router;