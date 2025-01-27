import pool from "./db";

const createTable = async () => {
  try {
    // Admin Table
    await pool.query(`
            CREATE TABLE IF NOT EXISTS "admin" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(500) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    // User Table
    await pool.query(`
            CREATE TABLE IF NOT EXISTS "user" (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(500) NOT NULL,
                phone VARCHAR(20),
                dob DATE,
                gender CHAR(1) CHECK (gender IN ('m', 'f', 'o')) NOT NULL,
                address VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    // Artist Table
    await pool.query(`
            CREATE TABLE IF NOT EXISTS "artist" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                dob DATE,
                gender CHAR(1) CHECK (gender IN ('m', 'f', 'o')) NOT NULL,
                address VARCHAR(255),
                first_release_year INT,
                no_of_albums_released INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    // Music Table
    await pool.query(`
            CREATE TABLE IF NOT EXISTS "music" (
                id SERIAL PRIMARY KEY,
                artist_id INT REFERENCES artist(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                album_name VARCHAR(255),
                genre VARCHAR(20) CHECK (genre IN('rnb', 'country', 'classic', 'rock', 'jazz')) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    console.log("Table Created Successfully");
  } catch (error) {
    console.log("Error Creating Table", error);
  }
};

export default createTable;
