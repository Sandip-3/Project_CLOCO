import { Router } from "express";
import musicController from "./music.controller";
import { validateMusic } from "../../middleware/validator";
import { validateRole } from "../../middleware/validate.role";

const musicRouter = Router();

musicRouter.post(
  "/create",
  validateMusic,
  validateRole(["superadmin"]),
  musicController.createMusic
);
musicRouter.patch("/:musicId", validateRole(["superadmin"]), musicController.updateMusic);

export default musicRouter;
