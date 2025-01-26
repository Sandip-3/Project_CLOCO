import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/Error";
import { Message } from "../utils/Messages";

interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const validateRole = (requiredRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!res.locals.user) {
        throw new CustomError("User not Logged In", 401);
      }

      if (!requiredRoles.includes(res.locals.user.role)) {
        throw new CustomError(Message.auth.unauthorized, 401);
      }

      next();
    } catch (error: any) {
      throw error;
    }
  };
};
