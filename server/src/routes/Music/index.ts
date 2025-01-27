import pool from "../../config/db";
import MusicServices from "./music.services";

const musicServices = new MusicServices(pool);

export default musicServices;
