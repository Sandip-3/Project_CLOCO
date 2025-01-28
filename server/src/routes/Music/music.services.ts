import { Pool } from "pg";
import CustomError from "../../utils/Error";

class MusicServices {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
    this.pool.connect();
  }
  async createMusic(
    artist_id: number,
    title: string,
    album_name: string,
    genre: string
  ) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        "INSERT INTO music (artist_id, title, album_name, genre) VALUES ($1, $2, $3, $4) RETURNING *",
        [artist_id, title, album_name, genre]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
    async updateMusicById(id: number, updatedData: Record<string, any>) {
        const client = await this.pool.connect();
        // console.log(id);
        if (!id || isNaN(id)) {
          throw new Error("Invalid Music ID");
        }
        try {
          //Checking if fields are modified
          if (Object.keys(updatedData).length === 0) {
            throw new Error("No valid fields provided for update");
          }
          console.log(updatedData);
    
          // SQL query for updates
          const query = `
              UPDATE "music"
              SET ${Object.keys(updatedData)
                .map((key, index) => `"${key}" = $${index + 1}`)
                .join(", ")}
              WHERE id = $${Object.keys(updatedData).length + 1}
              RETURNING *;
            `;
    
          // Combining updatedData values with the music ID
          const values = [...Object.values(updatedData), id];
    
          const result = await client.query(query, values);
    
          if (result.rowCount === 0) {
            throw new CustomError(`Music not found`, 404);
          }
          const updatedMusic = result.rows[0];
          const musicDetail = JSON.parse(JSON.stringify(updatedMusic));
          delete musicDetail.password;
          return musicDetail;
        } catch (err: any) {
          throw err;
        } finally {
          client.release();
        }
    }
    async deleteMusicById(id: number) {
        const client = await this.pool.connect();
        if (!id || isNaN(id)) {
          throw new Error("Invalid Music ID");
        }
        try {
          const existingMusic = await client.query(
            `SELECT * FROM "music" WHERE id = $1`,
            [id]
          );
          if (existingMusic.rows.length === 0) {
            throw new CustomError(`Music not found`, 404);
          }
          const result = await client.query(
            `DELETE FROM "music" WHERE id = $1 RETURNING *`,
            [id]
          );
          return result.rows[0];
        } catch (error) {
          throw error;
        } finally {
          client.release();
        }
    }
}
export default MusicServices;
