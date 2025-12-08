import Router from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middleware/auth";

const route =Router();

route.post("/",auth("admin","customer"),bookingController.createBooking);
route.get("/",auth("customer"),bookingController.getAllBooking);

export const bookingsRoute=route