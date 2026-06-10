import express from "express"
import { forgetPassword, login, logout, resetPassword, resgister } from "../controllers/authControllers.js";
const route = express.Router();
route.post("/signup",resgister)
route.post("/login",login);
route.delete("/logout",logout);

route.post("/forgot-password", forgetPassword);
route.post("/reset-password", resetPassword);
export default route;