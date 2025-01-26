import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const authHelper = {
  compareHash: async (plainText: string, hash: string): Promise<boolean> => {
    try {
      return await bcrypt.compare(plainText, hash);
    } catch (error) {
      throw error;
    }
  },

  hash: async (plainText: string): Promise<string> => {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      return await bcrypt.hash(plainText, salt);
    } catch (error) {
      throw error;
    }
  },
};

export default authHelper;
