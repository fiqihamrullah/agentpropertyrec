import { Router } from "express";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = Router();

// GET /api/recommendations?agent=Jill
// GET /api/recommendations?owner=Eve 
router.get("/recommendations", getRecommendations);

export default router;
