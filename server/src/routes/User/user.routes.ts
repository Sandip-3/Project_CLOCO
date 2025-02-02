import { requireUser } from "./../../middleware/require.user";
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
userRouter.get("/", userController.getUsers);
userRouter.patch(
  "/profile/:userId",
  requireUser,
  userController.updateUserProfile
);
userRouter.patch(
  "/:userId",
  validateRole(["superadmin"]),
  userController.updateUserProfile
);
userRouter.delete("/:userId", validateRole(["superadmin"]), userController.deleteUser);
export default userRouter;
