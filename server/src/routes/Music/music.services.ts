import { Pool } from "pg";

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
}
export default MusicServices;
