import Router from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middleware/auth";

const route =Router();

route.post("/",auth("admin","customer"),bookingController.createBooking);
route.get("/",auth("customer"),bookingController.getAllBooking);
route.put("/:bookingId",auth("admin"),bookingController.updateBooking);

export const bookingsRoute=route