import { Router } from "express";
import { authController } from "./auth.controller";


const route=Router();
route.post("/signup",authController.createUserAccount)

export const authRoute=route