import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { User } from "./user.types";
import CustomError from "../../utils/Error";
import { Message } from "../../utils/Messages";

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

      const hashedPassword = await bcrypt.hash(password, 10);

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
}
export default UserServices;
