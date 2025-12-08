import Router from "express";
import { bookingController } from "./bookings.controller";

const route =Router();

route.post("/",bookingController.createBooking);
route.get("/",bookingController.getAllBooking);

export const bookingsRoute=route