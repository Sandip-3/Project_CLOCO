import { Response, Request, NextFunction } from "express";
import { successResponse } from "../../utils/HttpResponse";
import artistService from ".";
import { Message } from "../../utils/Messages";

const artistController = {
  createArtist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released,
      } = req.body;
      const artist = await artistService.createArtist({
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released,
      });
      return successResponse({
        response: res,
        message: Message.artist.artist_register_success,
        data: artist,
      });
    } catch (error) {
      next(error);
    }
  },
  getArtists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const artists = await artistService.getArtists(page, limit);
      return successResponse({
        response: res,
        message: Message.artist.artist_fetch_success,
        data: artists,
      });
    } catch (error) {
      next(error);
    }
  },
};
export default artistController;
