
import { pool } from "../../database/db"
const createVehicles=async(payload:Record<string,unknown>,role:string)=>{
    if(role !=="admin"){
      throw new Error("you are not eligible")
    } else{
      const{vehicle_name,type,registration_number,daily_rent_price,availability_status}=payload;
    const result=await pool.query(`
       INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status)VALUES($1,$2,$3,$4,$5) RETURNING id,vehicle_name,type,registration_number,daily_rent_price,availability_status
    `,[vehicle_name,type,registration_number,daily_rent_price,availability_status])

    return result;
    }
    
}
const getAllVehicles=async()=>{
    const result= await pool.query(`
          SELECT * FROM vehicles
        `)
        return result
}
const getSingleVehicles=async(id:number)=>{
    const result= await pool.query(`
          SELECT * FROM vehicles WHERE id=$1
        `,[id])
        return result
}
const updateVehicles=async(id:number,vehicle_name?:string,type?:string,registration_number?:string,daily_rent_price?:number,availability_status?:string,role?:string)=>{
     if(role!=="admin"){
          throw new Error("you are not admin")
     } else{
       const oldData = await pool.query("SELECT * FROM vehicles WHERE id=$1",[id]);
    const existsData=oldData.rows[0];
    const updateData={
        vehicle_name:vehicle_name??existsData.vehicle_name,
        type:type??existsData.type,
        registration_number:registration_number??existsData.registration_number,
        daily_rent_price:daily_rent_price??existsData.daily_rent_price,
        availability_status:availability_status??existsData.availability_status

    }
    const result=await pool.query(`
        UPDATE vehicles SET vehicle_name=$1,type=$2,registration_number=$3,
        daily_rent_price=$4,
        availability_status=$5 WHERE id=$6 RETURNING *
    `,[updateData.vehicle_name,
      updateData.type,
      updateData.registration_number,
      updateData.daily_rent_price,
      updateData.availability_status,
      id])
       return result;
     }
}
const deleteVehicle=async(id:number,role:string)=>{
  if(role!=="admin"){
     throw new Error("you ar not admin")
  } else{
        const result=await pool.query(`
         DELETE FROM vehicles WHERE id=$1
        `,[id])
        return result;
  }
    
}
export const vehiclesService={
     createVehicles,getAllVehicles,getSingleVehicles,updateVehicles,deleteVehicle
}