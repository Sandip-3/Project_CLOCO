import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/HttpResponse";
import userServices from ".";
import { Message } from "../../utils/Messages";

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
};
export default userController;
