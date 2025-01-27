import pool from "../../config/db";
import ArtistService from "./artist.services";

const artistService = new ArtistService(pool);

export default artistService;
