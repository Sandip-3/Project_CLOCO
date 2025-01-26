import jwt, { SignOptions } from "jsonwebtoken";
import env from "../../config/env";
import logger from "../../config/logger";

export default class TokenHelper {
  static async generateToken(
    payload: { userId: string; role: string },
    option: SignOptions = { expiresIn: parseInt(env.jwtExpire as string, 10) }
  ) {
    try {
      // Creating a payload that contains both user ID and role
      const token = jwt.sign(
        { id: payload.userId, role: payload.role },
        env.jwtKeySecret as string,
        { ...option }
      );
      return token;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An error occurred while generating token.");
    }
  }

  static async verifyToken(token: string) {
    try {
      // Verify the token using the same secret key
      const decoded = jwt.verify(token, env.jwtKeySecret as string);
      return decoded;
    } catch (e) {
      logger.error(e);
      return null;
    }
  }
}
