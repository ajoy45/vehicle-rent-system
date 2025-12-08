 import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

 const route=Router();
 route.get("/",auth("admin"),userController.getAllUser);
 route.put("/:userId",userController.updateUser);
 route.delete("/:userId",userController.deleteUser);

 export const userRoute=route