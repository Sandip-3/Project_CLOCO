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
  updateArtist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artistId = parseInt(req.params.artistId);
      // Extract artist details from request body
      const {
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released,
      } = req.body;

      // Prepare updated artist data
      const updatedArtistData: Record<string, any> = {};
      if (name) updatedArtistData.name = name;
      if (dob) updatedArtistData.dob = dob;
      if (gender) updatedArtistData.gender = gender;
      if (address) updatedArtistData.address = address;
      if (first_release_year)
        updatedArtistData.first_release_year = first_release_year;
      if (no_of_albums_released)
        updatedArtistData.no_of_albums_released = no_of_albums_released;

      const updatedArtist = await artistService.updateArtistById(
        artistId,
        updatedArtistData
      );
      return successResponse({
        response: res,
        message: Message.artist.artist_update_success,
        data: updatedArtist,
      });
    } catch (error) {
      console.error("Error updating artist profile:", error);
      next(error);
    }
    },
    deleteArtist: async (req: Request, res: Response, next: NextFunction) => {
        try {
          const artistId = parseInt(req.params.artistId);
          const artist = await artistService.deleteArtistById(artistId);
          return successResponse({
            response: res,
            message: Message.artist.artist_delete_success,
            data: artist,
          });
        } catch (error) {
          console.error("Error deleting artist profile:", error);
          next(error);
        }
  },
  getArtist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artistId = parseInt(req.params.artistId);
      const artist = await artistService.getArtistById(artistId);
      return successResponse({
        response: res,
        message: Message.artist.artist_fetch_success,
        data: artist,
      });
    } catch (error) {
      console.error("Error fetching artist.", error);
      next(error);
    }
  }
};
export default artistController;
