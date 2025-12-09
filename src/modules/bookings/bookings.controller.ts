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
   const role=req.user!.role;
   const userId=req.user!.id;
   // const vehicleId=req.vehicle!.id;
   // console.log(vehicleId,userId);
     const result=await bookingService.getAllBooking(role,userId);
     res.status(200).json({
      success:true,
      message:"Bookings retrieved successfully",
      data:result
     })
  } catch (error) {
     res.status(404).json({
      success:false,
      message:"data not found"
     })
  }
}
const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = Number(req.params.bookingId);
    const { status } = req.body;
    const role = req.user!.role ;
    const userId = req.user!.id;

    const result = await bookingService.updateBooking(
      bookingId,
      status,
      role,
      userId
    );

    res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned. Vehicle is now available",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const bookingController={
    createBooking,getAllBooking,updateBooking
}