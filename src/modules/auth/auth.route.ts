import { Router } from "express";
import { authController } from "./auth.controller";


const route=Router();
route.post("/signup",authController.createUserAccount)
route.post("/signin",authController.loginUser)

export const authRoute=route