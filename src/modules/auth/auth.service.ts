import { pool } from "../../database/db"
import bcrypt from "bcryptjs";
const createUserAccount=async(payload:Record<string,unknown>)=>{
    // console.log(payload)
    const{name,email,password,phone,role}=payload;
    const hashPassword=await bcrypt.hash(password as string,12)
  const result=await pool.query(`
       INSERT INTO users(name,email,password,phone,role)VALUES($1,$2,$3,$4,$5) RETURNING id,name,email,phone,role
    `,[name,email,hashPassword,phone,role])

    return result;
}
export const authService={
    createUserAccount
}