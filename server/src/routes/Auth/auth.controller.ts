import { NextFunction, Request, Response } from "express";
import AuthService from ".";
import { successResponse } from "../../utils/HttpResponse";
import CustomError from "../../utils/Error";
import { Message } from "../../utils/Messages";

const AuthController = {
  // User Login
  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const loginUser = await AuthService.loginUser({ email, password });
      res.setHeader("Authorization", `Bearer ${loginUser.accessToken}`);

      return successResponse({
        response: res,
        message: Message.user.user_login_success,
        data: loginUser,
      });
    } catch (err: any) {
      next(err);
    }
  },

  // Admin Login
  loginAdmin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password } = req.body;
      if (!email && !username) {
        throw new CustomError("Either email or username is required!", 400);
      }
      const loginAdmin = await AuthService.loginAdmin({
        email,
        username,
        password,
      });

      res.setHeader("Authorization", `Bearer ${loginAdmin.accessToken}`);

      return successResponse({
        response: res,
        message: "Admin Logged In Successfully",
        data: loginAdmin,
      });
    } catch (err: any) {
      next(err);
    }
  },
};

export default AuthController;
