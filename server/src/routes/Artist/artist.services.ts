import { Pool } from "pg";
import { Artist } from "./artist.types";
class ArtistService {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
    this.pool.connect();
  }
  async createArtist({
    name,
    dob,
    gender,
    address,
    first_release_year,
    no_of_albums_released,
  }: Artist) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(
        `INSERT INTO "artist" (name, dob, gender, address, first_release_year, no_of_albums_released) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, dob, gender, address, first_release_year, no_of_albums_released]
      );
      const artist = res.rows[0];
      return artist;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
export default ArtistService;
