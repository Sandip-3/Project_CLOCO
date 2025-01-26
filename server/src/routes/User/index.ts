import pool from "../../config/db";
import UserServices from "./user.services";

const userServices = new UserServices(pool);

export default userServices;
