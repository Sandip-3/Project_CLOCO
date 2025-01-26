import { Router } from "express";
import healthRouter from "./Health/health.routes";
import userRouter from "./User/user.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/user", userRouter);

export default router;
