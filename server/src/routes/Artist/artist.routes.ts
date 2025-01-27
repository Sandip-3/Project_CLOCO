import { Router } from "express";
import { validateRole } from "../../middleware/validate.role";
import artistController from "./artist.controller";
import { validateArtistRegistration } from "../../middleware/validator";

const artistRouter = Router();

artistRouter.post(
    "/register",
    validateArtistRegistration,
  validateRole(["superadmin"]),
  artistController.createArtist
);
artistRouter.get("/", artistController.getArtists);

export default artistRouter;
