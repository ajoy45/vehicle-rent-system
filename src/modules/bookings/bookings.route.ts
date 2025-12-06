import Router from "express";
import { bookingController } from "./bookings.controller";

const route =Router();

route.post("/",bookingController.createBooking);

export const bookingsRoute=route