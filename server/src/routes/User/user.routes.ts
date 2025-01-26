import { Router } from "express";
import userController from "./user.controller";
import { validateUserRigistration } from "../../middleware/validator";
import { validateRole } from "../../middleware/validate.role";

const userRouter = Router();

userRouter.post(
  "/register",
  validateUserRigistration,
  userController.createUser
);
userRouter.get("/:userId", userController.getUser);
userRouter.get("/", validateRole(["superadmin"]), userController.getUsers);
export default userRouter;