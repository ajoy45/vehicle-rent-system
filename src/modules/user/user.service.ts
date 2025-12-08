import { pool } from "../../database/db"

const getAllUsers=async(role:string)=>{
        if (role !== "admin") {
          throw new Error("Not allowed!");
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
const deleteUser=async(id:number)=>{
    const result= await pool.query(`
          DELETE FROM users WHERE id=$1
        `,[id])
        return result
}
export const userService={
    getAllUsers,updateUser,deleteUser
}