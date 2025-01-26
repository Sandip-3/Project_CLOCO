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
    getUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params;
            const user = await userServices.getUser(Number(userId));
            return successResponse({
                response: res,
                message: Message.user.user_found,
                data: user,
            })
        } catch (error) {
            next(error);
        }
  }, 
    getUsers : async (req: Request, res: Response, next: NextFunction) => {
      try {
          const page = req.query.page
            ? parseInt(req.query.page as string, 10)
            : 1;
          const limit = req.query.limit
            ? parseInt(req.query.limit as string, 10)
            : 10;
            const users = await userServices.getUsers(page , limit);
            return successResponse({
                response: res,
                message: Message.user.users_found,
                data: users,
            })
        } catch (error) {
            next(error);
        }
    }
};
export default userController;
