import { Router } from "express";
import healthRouter from "./Health/health.routes";

const router = Router();

router.use("/health", healthRouter);

export default router;
