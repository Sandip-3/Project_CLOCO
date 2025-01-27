import { Pool } from "pg";
import { User, Users } from "./user.types";
import CustomError from "../../utils/Error";
import { Message } from "../../utils/Messages";
import authHelper from "../../routes/Auth/auth.helper";

class UserServices {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
    this.pool.connect();
  }
  async createUser({
    first_name,
    last_name,
    phone,
    email,
    password,
    dob,
    gender,
    address,
  }: User) {
    const client = await this.pool.connect();
    try {
      const existingUser = await client.query(
        'SELECT * FROM "user" WHERE email = $1',
        [email]
      );
      if (existingUser.rows.length > 0)
        throw new CustomError(Message.user.user_already_exists, 400);

      const hashedPassword = await authHelper.hash(password);

      const res = await client.query(
        'INSERT INTO "user" (first_name,last_name, email,phone, password,dob,gender,address) VALUES ($1, $2, $3, $4, $5,$6,$7,$8) RETURNING *',
        [
          first_name,
          last_name,
          email,
          phone,
          hashedPassword,
          dob,
          gender,
          address,
        ]
      );

      const user = res.rows[0];
      const newUser = JSON.parse(JSON.stringify(user));
      delete newUser.password;
      return newUser;
    } catch (err: any) {
      throw err;
    } finally {
      client.release();
    }
  }
  async getUser(userId: number) {
    const client = await this.pool.connect();
    try {
      const user = await client.query('SELECT * FROM "user" WHERE id = $1', [
        userId,
      ]);
      if (user.rows.length === 0)
        throw new CustomError(Message.user.user_not_found, 404);
      const foundUser = user.rows[0];
      const userDetail = JSON.parse(JSON.stringify(foundUser));
      delete userDetail.password;
      return userDetail;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async getUsers(page: number, limit: number) {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;
    console.log(limit);
    if (offset < 0) {
      throw new Error("Invalid page number");
    }
    try {
      const users = await client.query(
        'SELECT * FROM "user" LIMIT $1 OFFSET $2',
        [limit, offset]
      );
      const totalCountResult = await client.query(
        'SELECT COUNT(*) FROM "user"'
      );
      const foundUsers = users.rows;
      const usersDetail = foundUsers.map((user: Users) => {
        const userDetail = JSON.parse(JSON.stringify(user));
        delete userDetail.password;
        return userDetail;
      });
      return {
        usersDetail,
        totalCount: Number(totalCountResult.rows[0].count),
        page: page,
        limit: limit,
      };
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
  async updateUserById(id: number, updatedData: Record<string, any>) {
    const client = await this.pool.connect();
    try {
      //Checking if fields are modified
      if (Object.keys(updatedData).length === 0) {
        throw new Error("No valid fields provided for update");
      }

      if (updatedData.email) {
        throw new CustomError("Email cannot be updated", 400);
      }

      // SQL query for updates
      const query = `
      UPDATE "user"
      SET ${Object.keys(updatedData)
        .map((key, index) => `"${key}" = $${index + 1}`)
        .join(", ")}
      WHERE id = $${Object.keys(updatedData).length + 1}
      RETURNING *;
    `;

      // Combining updatedData values with the user ID
      const values = [...Object.values(updatedData), id];

      const result = await client.query(query, values);

      if (result.rowCount === 0) {
        throw new CustomError(`User with ID ${id} not found`, 404);
      }
      const updatedUser = result.rows[0];
      const userDetail = JSON.parse(JSON.stringify(updatedUser));
      delete userDetail.password;
      return userDetail;
    } catch (err: any) {
      throw err;
    } finally {
      client.release();
    }
  }
  async deleteUserById(id: number) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'DELETE FROM "user" WHERE id = $1 RETURNING *',
        [id]
      );
      if (result.rowCount === 0) {
        throw new CustomError(`User with ID ${id} not found`, 404);
      }
      const deletedUser = result.rows[0];
      const userDetail = JSON.parse(JSON.stringify(deletedUser));
      delete userDetail.password;
      return userDetail;
    } catch (err: any) {
      throw err;
    } finally {
      client.release();
    }
  }
}
export default UserServices;
