import { pool } from "../../database/db"

const getAllUsers=async(role:string)=>{
        if (role !== "admin") {
          throw new Error("Not Allowed")
        }
        const result= await pool.query(`
          SELECT * FROM users
        `)
         return result

}
const updateUser=async(name:string,email:string,phone:string,role:string,id:number)=>{
    const result= await pool.query(`
          UPDATE users SET name=$1,email=$2,phone=$3,role=$4 WHERE id=$5 RETURNING *
        `,[name,email,phone,role,id])
        return result
}
const deleteUser=async(id:number,role:string)=>{
  if(role!=="admin"){
    throw new Error("you are not admin")
  } else{
      
        const activeBooking=await pool.query(`
              SELECT id FROM bookings WHERE customer_id = $1 AND status = 'active'
          `,[id])
          if(activeBooking.rows[0].status==="active"){
             throw new Error("you can not delete")
          } else{
           const result= await pool.query(`
          DELETE FROM users WHERE id=$1
           `,[id])
            return result
          }

       
  }
    
}
export const userService={
    getAllUsers,updateUser,deleteUser
}