import { Request, Response, NextFunction } from "express";
import CustomError, { errorHandler } from "../utils/Error";
import userServices from "../routes/User";
interface AuthenticatedUser {
  id: string;
  role: string;
}

export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user as AuthenticatedUser;
    // console.log(user.id)
    let isValid = false;
    if (!user || !user.id) {
      return errorHandler(res, new CustomError("User not logged in", 401));
    }
      const userData = await userServices.getUser(Number(user.id));
    if (userData) {
      isValid = true;
    }
    if (isValid) {
      next();
    } else {
      return errorHandler(res, new CustomError("Unauthorized User", 401));
    }
  } catch (error: any) {
    console.error("Error in requireUser middleware:", error);
    return errorHandler(res, new CustomError("Internal Server Error", 500));
  }
};

export default requireUser;
