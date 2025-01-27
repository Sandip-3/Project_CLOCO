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

export const validateUserLogin = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  validationCheck,
];

export const validateAdminLogin = [
  body("email").optional(),
  body("username").optional(),
  body("password").notEmpty().withMessage("Password is required"),
  validationCheck,
];

export const validateArtistRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("dob").notEmpty().withMessage("Date of birth is required"),
  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["m", "f", "o"])
    .withMessage("Invalid gender"),
  body("address").notEmpty().withMessage("Address is required"),
  body("first_release_year")
    .notEmpty()
    .withMessage("First release year is required")
    .isInt()
    .withMessage("Invalid year"),
  body("no_of_albums_released")
    .notEmpty()
    .withMessage("Number of albums released is required"),
  validationCheck,
];

export const validateMusic = [
  body("artist_id").notEmpty().withMessage("Artist ID is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("album_name").notEmpty().withMessage("Album name is required"),
  body("genre")
    .notEmpty()
    .withMessage("Genre is required")
    .isIn(["rnb", "country", "classic", "rock", "jazz"])
    .withMessage("Invalid genre"),
  validationCheck,
];
