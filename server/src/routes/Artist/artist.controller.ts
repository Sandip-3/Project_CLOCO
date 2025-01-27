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
            })
        } catch (error) {
            next(error);
        }
    }
}
export default artistController;