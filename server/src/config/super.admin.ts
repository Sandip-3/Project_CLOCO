import pool from "./db";
import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

interface SuperAdminData {
  name: string;
  username: string;
  password: string;
  email: string;
}

const seedSuperAdmin = async () => {
  const superAdminData: SuperAdminData = {
    name: "Super Admin",
    username: "superadmin",
    password: "SuperAdmin",
    email: "super@email.com",
  };

  const client = await pool.connect();

  try {
    // Checking if the super admin already exists
    const existingAdmin = await client.query(
      'SELECT * FROM "admin" WHERE username = $1',
      [superAdminData.username]
    );

    if (existingAdmin.rows.length > 0) {
      return;
    }

    // Hashing the super admin password
    const hashedPassword = await bcrypt.hash(
      superAdminData.password,
      SALT_ROUNDS
    );

    // Inserting the super admin into the admin table
    await client.query(
      'INSERT INTO "admin" (name,email, username, password) VALUES ($1, $2, $3 , $4)',
      [
        superAdminData.name,
        superAdminData.email,
        superAdminData.username,
        hashedPassword,
      ]
    );

    console.log("Super Admin seeded successfully");
  } catch (error: any) {
    console.error("Error seeding super admin:", error.message);
  } finally {
    client.release();
  }
};

export default seedSuperAdmin;
