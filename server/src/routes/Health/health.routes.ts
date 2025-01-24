import { Router } from "express";
import HealthController from "./health.controller";

const healthRouter = Router();

healthRouter.route("/").get(HealthController.healthCheck);

export default healthRouter;
