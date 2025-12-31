import { Router } from "express";
import { getAllWards, getWardById, seedWards } from "../controllers/ward.controller";

const router = Router();

router.get("/", getAllWards);
router.get("/:id", getWardById);
router.post("/seed", seedWards);

export default router;
