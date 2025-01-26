import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { errorResponse } from "../utils/HttpResponse";

function validationCheck(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse({
      response: res,
      message: "Validation Error",
      data: errors.array(),
      status: 400,
    });
  }
  next();
}

export const validateUserRigistration = [
  body("first_name")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 255 })
    .withMessage("First name must be less than 255 characters"),

  body("last_name")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 255 })
    .withMessage("Last name must be less than 255 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("ne-NP")
    .withMessage("Invalid phone number"),

  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["m", "f", "o"])
    .withMessage("Invalid gender"),

  body("address").notEmpty().withMessage("Address is required"),
  validationCheck,
];
