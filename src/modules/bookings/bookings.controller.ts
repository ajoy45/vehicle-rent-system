import { Request, Response } from "express";
import { bookingService } from "./bookings.service";

const createBooking=async(req:Request,res:Response)=>{
  try {
     const result=await bookingService.createBooking(req.body);
     res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data:result
     })
  } catch (error:any) {
     res.status(400).json({
        success:false,
        message:error.message
     })
  }
}
export const bookingController={
    createBooking
}