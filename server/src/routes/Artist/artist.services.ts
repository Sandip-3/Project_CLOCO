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
  async getArtists(page: number, limit: number) {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    if (offset < 0) {
      throw new Error("Invalid page number");
    }
    try {
      const res = await client.query(
        `SELECT * FROM "artist" LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      const artistCount = await client.query(`SELECT COUNT(*) FROM "artist"`);
      return {
        data: res.rows,
        total: parseInt(artistCount.rows[0].count),
        page,
        limit,
      };
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
export default ArtistService;
