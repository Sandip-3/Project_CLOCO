import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import routes from "./src/routes";
import env from "./src/config/env";
import logger from "./src/config/logger";
import CustomError from "./src/utils/Error";
import globalErrorHandler from "./src/middleware/globalErrorHandler";
import { checkConnection } from "./src/config/db";

(async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors(env.cors ? { origin: env.cors, optionsSuccessStatus: 200 } : undefined)
  );

  morgan.token("level", (req: Request, res: Response) => {
    const statusCode = res.statusCode;
    if (statusCode >= 500) {
      return "[ERROR]";
    } else if (statusCode >= 400) {
      return "[WARN]";
    } else {
      return "[INFO]";
    }
  });
  app.use(
    morgan(
      ":date[iso] :level :method :url :status :res[content-length] :referrer :total-time[5] - :response-time ms"
    )
  );
  //Route path prefix
  app.use("/api/v1", routes);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    console.log("Error");
    throw new CustomError(
      `Can't find path for ${req.originalUrl} on server!`,
      404
    );
  });

  app.use(globalErrorHandler);
  const port = 8000;
    app.listen(port, async () => {
       await checkConnection();
    console.log(
      `The application is listening on port \x1b[4m\x1b[31m${port}\x1b[0m`
    );
  });

  process.on("SIGINT", () => {
    process.exit();
  });
  // Unhandled Promise Rejections
  process.on("unhandledRejection", (reason, promise) => {
    logger.error(
      JSON.stringify({
        message: `Unhandled Rejection at:, ${promise}`,
        error: reason,
      })
    );
  });

  // Unhandled Exceptions
  process.on("uncaughtException", (error) => {
    logger.error(JSON.stringify({ message: `Uncaught Exception:, ${error}` }));
  });
})();
