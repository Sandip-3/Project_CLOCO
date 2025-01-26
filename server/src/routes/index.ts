import { Router } from "express";
import healthRouter from "./Health/health.routes";
import userRouter from "./User/user.routes";
import authRouter from "./Auth/auth.routes";

const router = Router();

router.use('/', authRouter)
router.use("/health", healthRouter);
router.use("/user", userRouter);

export default router;
