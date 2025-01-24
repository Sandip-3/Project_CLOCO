import { Request, Response, NextFunction } from "express";
import { DatabaseError } from "pg"; // PostgreSQL-specific errors
import logger from "../config/logger";
import { errorResponse } from "../utils/HttpResponse";
import CustomError from "../utils/Error";

const globalErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error);

  // Handle Custom Errors
  if (error instanceof CustomError) {
    return errorResponse({
      response: res,
      message: error.message,
      status: error.statusCode,
      data: error.errors,
    });
  }

  // Handle PostgreSQL-specific errors
  if (error instanceof DatabaseError) {
    if (error.code === "23505") {
      return errorResponse({
        response: res,
        message: "Duplicate entry detected",
        status: 400,
      });
    }
    // Foreign key constraint violation
    if (error.code === "23503") {
      return errorResponse({
        response: res,
        message: "Foreign key constraint violated",
        status: 400,
      });
    }

    // Default response for other DatabaseError types
    return errorResponse({
      response: res,
      message: `Database Error: ${error.message}`,
      status: 500,
    });
  }

  // Handle Validation Errors
  if (error instanceof Error && error.name === "ValidationError") {
    return errorResponse({
      response: res,
      message: error.message,
      status: 400,
    });
  }

  // Handle other generic runtime errors
  if (error instanceof Error) {
    return errorResponse({
      response: res,
      message: error.message || "Internal Server Error",
      status: 500,
    });
  }

  // Fallback for unknown error types
  return errorResponse({
    response: res,
    message: "An unknown error occurred",
    status: 500,
  });
};

export default globalErrorHandler;
