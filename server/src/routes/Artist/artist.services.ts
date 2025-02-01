import { Pool } from "pg";
import { Artist } from "./artist.types";
import CustomError from "../../utils/Error";
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
  async updateArtistById(id: number, updatedData: Record<string, any>) {
    const client = await this.pool.connect();
    console.log(id);
    if (!id || isNaN(id)) {
      throw new Error("Invalid artist ID");
    }
    try {
      //Checking if fields are modified
      if (Object.keys(updatedData).length === 0) {
        throw new Error("No valid fields provided for update");
      }
      console.log(updatedData);

      // SQL query for updates
      const query = `
          UPDATE "artist"
          SET ${Object.keys(updatedData)
            .map((key, index) => `"${key}" = $${index + 1}`)
            .join(", ")}
          WHERE id = $${Object.keys(updatedData).length + 1}
          RETURNING *;
        `;

      // Combining updatedData values with the artist ID
      const values = [...Object.values(updatedData), id];

      const result = await client.query(query, values);

      if (result.rowCount === 0) {
        throw new CustomError(`Artist with ID ${id} not found`, 404);
      }
      const updatedArtist = result.rows[0];
      const artistDetail = JSON.parse(JSON.stringify(updatedArtist));
      delete artistDetail.password;
      return artistDetail;
    } catch (err: any) {
      throw err;
    } finally {
      client.release();
    }
  }
  async deleteArtistById(id: number) {
    const client = await this.pool.connect();
    if (!id || isNaN(id)) {
      throw new Error("Invalid artist ID");
    }
    try {
      const existingArtist = await client.query(
        `SELECT * FROM "artist" WHERE id = $1`,
        [id]
      );
      if (existingArtist.rows.length === 0) {
        throw new CustomError(`Artist not found`, 404);
      }
      const res = await client.query(
        `DELETE FROM "artist" WHERE id = $1 RETURNING *`,
        [id]
      );
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async getArtistById(id: number) {
    const client = await this.pool.connect();
    if (!id || isNaN(id)) {
      throw new Error("Invalid artist ID");
    }
    try {
      const res = await client.query(
        `SELECT * FROM "artist" WHERE id = $1`,
        [id]
      );
      if (res.rows.length === 0) {
        throw new CustomError(`Artist not found`, 404);
      }
      return res.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
export default ArtistService;
