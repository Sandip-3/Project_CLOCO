import { Router } from "express";
import AuthController from "./auth.controller";
import {
  validateAdminLogin,
  validateUserLogin,
} from "../../middleware/validator";

const authRouter = Router();

// Only the login route is kept
authRouter.post("/user/login", validateUserLogin, AuthController.loginUser);
authRouter.post("/admin/login", validateAdminLogin, AuthController.loginAdmin);

export default authRouter;
