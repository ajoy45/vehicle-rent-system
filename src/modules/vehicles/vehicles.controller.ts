import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.createVehicles(req.body);
    return res.status(201).json({
       success: true,
       message: "Vehicle created successfully",
       data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getAllVehicles();
    if(result.rows.length===0){
        return res.status(200).json({
             success: true,
             message: "No vehicles found",
             data: []
        })
    } else{
      return res.status(200).json({
       success: true,
       message: "vehicles retrieved successfully",
       data: result.rows,
    });
    }
   
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSingleVehicle=async(req: Request, res: Response)=>{
  const id=Number(req.params.vehicleId);
    try {
     
       const result= await vehiclesService.getSingleVehicles(id);
        
          res.status(200).json({
            success:true,
            message:"Vehicle retrieved successfully",
            data:result.rows[0]
          })
         
    } catch (error:any) {
       res.status(404).json({
          success:false,
          message:error.message
        })
    }
}

 const updateVehicles=async(req:Request,res:Response)=>{
      const id=Number(req.params.vehicleId);
      const{vehicle_name,type,registration_number,daily_rent_price,availability_status}=req.body
   try {
   
      const result= await vehiclesService.updateVehicles(id,vehicle_name,type,registration_number,daily_rent_price,availability_status);
        if(result.rows.length===0){
             res.status(404).json({
             success:false,
             message:"data not found"
           })
        } else{
         res.status(200).json({
           success:true,
           message:"Vehicle updated successfully",
           data:result.rows[0]
         })
        }
   } catch (error:any) {
      res.status(404).json({
         success:false,
         message:error.message
       })
   }
 }


 const deleteVehicle=async(req:Request,res:Response)=>{
     const id=Number(req.params.vehicleId);
   try {
      const result= await vehiclesService.deleteVehicle(id);
        if(result.rowCount===0){
             res.status(404).json({
             success:false,
             message:"data not found"
           })
        } else{
         res.status(200).json({
           success:true,
           message: "Vehicle deleted successfully"
          
         })
        }
   } catch (error:any) {
      res.status(404).json({
         success:false,
         message:error.message
       })
   }
 }
export const vehiclesController={
    createVehicles,getAllVehicles,getSingleVehicle,updateVehicles,deleteVehicle
}