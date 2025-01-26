import { Pool } from "pg";
import { User } from "./auth.types";
import authHelper from "./auth.helper";
import TokenHelper from "../../utils/JWT";
import CustomError from "../../utils/Error";
import { Message } from "../../utils/Messages";

class AuthService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
    this.pool.connect();
  }

  // User Login
  async loginUser({ email, password }: Partial<User>) {
    const client = await this.pool.connect();
    try {
      const existingUser = await client.query(
        'SELECT * FROM "user" WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length === 0) {
        throw new CustomError(Message.auth.not_found, 404);
      }

      const user = existingUser.rows[0];

      // Comparing the hashed password
      const isPasswordValid = await authHelper.compareHash(
        password!,
        user.password
      );
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        console.log("Password Wrong");
        throw new CustomError("Invalid Credentials", 400);
      }

      // Generating token with role 'user'
      const accessToken = await TokenHelper.generateToken({
        userId: user.id,
        role: "user",
      });

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          address: user.address,
          name: user.first_name + " " + user.last_name,
          role: "user",
        },
      };
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  // Admin Login
  async loginAdmin({ email, username, password }: Partial<User>) {
    const client = await this.pool.connect();
    try {
      let existingAdmin;

      // Checking admin by email or username
      if (email) {
        existingAdmin = await client.query(
          'SELECT * FROM "admin" WHERE email = $1',
          [email]
        );
      } else if (username) {
        existingAdmin = await client.query(
          'SELECT * FROM "admin" WHERE username = $1',
          [username]
        );
      }

      if (!existingAdmin || existingAdmin.rows.length === 0) {
        throw new CustomError(Message.auth.not_found, 404);
      }

      const admin = existingAdmin.rows[0];
      const isPasswordValid = await authHelper.compareHash(
        password!,
        admin.password
      );

      if (!isPasswordValid) {
        throw new CustomError("Invalid Credentials", 400);
      }

      // Generating token with role 'superadmin'
      const accessToken = await TokenHelper.generateToken({
        userId: admin.id,
        role: "superadmin",
      });

      return {
        accessToken,
        user: {
          id: admin.id,
          name: admin.name,
          username: admin.username,
          email: admin.email,
          role: "superadmin",
        },
      };
    } catch (err) {
      console.error("Error logging in admin:", err);
      throw err;
    } finally {
      client.release();
    }
  }
}

export default AuthService;
