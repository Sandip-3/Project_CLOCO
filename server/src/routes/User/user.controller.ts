import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/HttpResponse";
import userServices from ".";
import { Message } from "../../utils/Messages";
import authHelper from "../Auth/auth.helper";
import CustomError from "../../utils/Error";

const userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        phone,
        dob,
        gender,
        address,
      } = req.body;
      const registerUser = await userServices.createUser({
        first_name,
        last_name,
        email,
        password,
        phone,
        dob,
        gender,
        address,
      });

      return successResponse({
        response: res,
        message: Message.user.user_register_success,
        data: registerUser,
      });
    } catch (error) {
      next(error);
    }
  },
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const user = await userServices.getUser(Number(userId));
      return successResponse({
        response: res,
        message: Message.user.user_found,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;
      const users = await userServices.getUsers(page, limit);
      return successResponse({
        response: res,
        message: Message.user.users_found,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
  updateUserProfile: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(res.locals.user.id);
      const userId = parseInt(req.params.userId);
      // console.log(id);
      // console.log(userId);
      if (res.locals.user.role != "superadmin" && id !== Number(userId)) {
        throw new CustomError("Unauthorized user", 401);
      }
      // Extract user details from request body
      const { first_name, last_name, dob, phone, address, email, password } =
        req.body;

      // Prepare updated user data
      const updatedUserData: Record<string, any> = {};
      if (first_name) updatedUserData.first_name = first_name;
      if (email) updatedUserData.email = email;
      if (last_name) updatedUserData.last_name = last_name;
      if (phone) updatedUserData.phone = phone;
      if (address) updatedUserData.address = address;
      if (dob) updatedUserData.dob = dob;

      if (password) updatedUserData.password = await authHelper.hash(password);
      const updatedUser = await userServices.updateUserById(
        userId,
        updatedUserData
      );
      return successResponse({
        response: res,
        message: Message.user.user_update_success,
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      next(error);
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await userServices.deleteUserById(userId);
      return successResponse({
        response: res,
        message: Message.user.user_delete_success,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
export default userController;
