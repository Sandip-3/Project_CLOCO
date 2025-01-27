import { Request, Response, NextFunction } from "express";
import musicServices from ".";
import { successResponse } from "../../utils/HttpResponse";
import { Message } from "../../utils/Messages";

const musicController = {
    createMusic: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { artist_id, title, album_name, genre } = req.body;
            const music = await musicServices.createMusic(artist_id, title, album_name, genre);
            return successResponse({
                response: res,
                message: Message.music.music_upload_success,
                data: music,
            })
        } catch (error) {
            next(error);
        }
    }
}
export default musicController;