import { Request, Response, NextFunction } from "express";
import musicServices from ".";
import { successResponse } from "../../utils/HttpResponse";
import { Message } from "../../utils/Messages";

const musicController = {
  createMusic: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { artist_id, title, album_name, genre } = req.body;
      const music = await musicServices.createMusic(
        artist_id,
        title,
        album_name,
        genre
      );
      return successResponse({
        response: res,
        message: Message.music.music_upload_success,
        data: music,
      });
    } catch (error) {
      next(error);
    }
  },
  updateMusic: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const musicId = parseInt(req.params.musicId);
      // Extract music details from request body
      const {
        artist_id,
        title,
        album_name,
        genre,
      } = req.body;

      // Prepare updated music data
      const updatedMusicData: Record<string, any> = {};
      if (artist_id) updatedMusicData.artist_id = artist_id;
      if (title) updatedMusicData.title = title;
      if (album_name) updatedMusicData.gender = album_name;
      if (genre) updatedMusicData.address = genre;

      const updatedArtist = await musicServices.updateMusicById(
        musicId,
        updatedMusicData
      );
      return successResponse({
        response: res,
        message: Message.artist.artist_update_success,
        data: updatedArtist,
      });
    } catch (error) {
      console.error("Error updating Music:", error);
      next(error);
    }
    },
    deleteMusic: async (req: Request, res: Response, next: NextFunction) => {
        try {
          const musicId = parseInt(req.params.musicId);
          const music = await musicServices.deleteMusicById(musicId);
          return successResponse({
            response: res,
            message: Message.music.music_delete_success,
            data: music,
          });
        } catch (error) {
          console.error("Error deleting Music:", error);
          next(error);
        }
    },
    getMusicByArtist: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const artistId = parseInt(req.params.artistId);
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
          const music = await musicServices.getMusicByArtistId(artistId,page ,limit);
          return successResponse({
            response: res,
            message: "Music fetched successfully",
            data: music,
          });
        } catch (error) {
          next(error);
        }
    }
};
export default musicController;