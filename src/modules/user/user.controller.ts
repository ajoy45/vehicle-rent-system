import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    
    const result = await userService.getAllUsers(req.user!.role);       
    return res.status(200).json({
       success: true,
       message: "Users retrieved successfully",
       data: result.rows
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateUser=async(req:Request,res:Response)=>{
    const id=Number(req.params.userId);
     const{name,email,phone,role}=req.body
  try {
   
     const result= await userService.updateUser(name,email,phone,role,id);
       if(result.rows.length===0){
            res.status(404).json({
            success:false,
            message:"data not found"
          })
       } else{
        res.status(200).json({
          success:true,
          message:"User updated successfully",
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
const deleteUser=async(req:Request,res:Response)=>{
    const id=Number(req.params.userId);
    const role=req.user!.role;
     
  try {
     const result= await userService.deleteUser(id,role);
       if(result.rowCount===0){
            res.status(404).json({
            success:false,
            message:"data not found"
          })
       } else{
        res.status(200).json({
          success:true,
          message: "User deleted successfully"
          
        })
       }
  } catch (error:any) {
     res.status(404).json({
        success:false,
        message:error.message
      })
  }
}
export const userController={
    getAllUser,updateUser,deleteUser
}