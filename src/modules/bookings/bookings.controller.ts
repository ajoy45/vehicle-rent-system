import { Request, Response } from "express";
import { bookingService } from "./bookings.service";

const createBooking=async(req:Request,res:Response)=>{
  try {
     const result=await bookingService.createBooking(req.body,req.user!.role);
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
const getAllBooking=async(req:Request,res:Response)=>{
  try {
     const result=await bookingService.getAllBooking();
     res.status(200).json({
      success:true,
      message:"Bookings retrieved successfully",
      data:result.rows
     })
  } catch (error) {
     res.status(404).json({
      success:false,
      message:"data not found"
     })
  }
}
export const bookingController={
    createBooking,getAllBooking
}