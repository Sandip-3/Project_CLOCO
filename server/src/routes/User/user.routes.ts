import { Router } from "express";
import userController from "./user.controller";
import { validateUserRigistration } from "../../middleware/validator";

const userRouter = Router();

userRouter.post(
  "/register",
  validateUserRigistration,
  userController.createUser
);

export default userRouter;
