import { analyzeFile, deleteInsight, getAllInsights, getInsightById } from '../controllers/aiController.js';
import { protectedRoute } from '../middlewares/protectedRoute.js';
import express from 'express'

const aiRoute = express.Router();

aiRoute.post("/analyze", protectedRoute, analyzeFile);

aiRoute.get("/insights", protectedRoute, getAllInsights);

aiRoute.get("/insights/:id", protectedRoute, getInsightById);

aiRoute.delete("/insights/:id", protectedRoute, deleteInsight);

export default aiRoute