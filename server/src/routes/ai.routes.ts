import { Router } from "express";
import { getHealthAdvice } from "../controllers/ai.controller";

const router = Router();

router.post("/advice", getHealthAdvice);

export default router;
