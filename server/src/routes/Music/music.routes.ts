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
musicRouter.get("/:musicId", musicController.getMusic);
musicRouter
  .route("/:musicId")
  .all(validateRole(["superadmin"]))
  .patch(musicController.updateMusic)
  .delete(musicController.deleteMusic);

musicRouter.get("/artist/:artistId", musicController.getMusicByArtist);

export default musicRouter;
