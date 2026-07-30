import { Router } from "express";
import { sendMail } from "../controllers/mailController.js";
import validateMail from "../middleware/validateMail.js";

const router = Router();

router.post("/", validateMail, sendMail);

export default router;
