import pool from "../../config/db";
import AuthService from "./auth.services";

const authService = new AuthService(pool);

export default authService;
