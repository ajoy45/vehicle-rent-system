import moment from "moment";
import { pool } from "../../database/db";
import { CreateBooking } from "../../interface/booking.interface";



 const createBooking = async (payload:CreateBooking,role:string) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  if(role === 'admin' || role === 'customer'){
             // Check vehicle
    const getVehicle = await pool.query(
      "SELECT id, vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id=$1 FOR UPDATE",
      [vehicle_id]
    );
    const vehicle = getVehicle.rows[0];
    // console.log(vehicle);
    if (!vehicle){
       throw new Error("Vehicle not found");
    } 
    if (vehicle.availability_status!=="available"){
       throw new Error("Vehicle is not available");
    } 

    // Calculate total price
    const start = moment(rent_start_date);
    const end = moment(rent_end_date);
    const duration = end.diff(start, "days") + 1;
    const total_price = duration * parseFloat(vehicle.daily_rent_price);

    // Insert booking
    const createBookings = await pool.query(
      `INSERT INTO bookings 
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, "active"]
    );

    // Update vehicle status
    await pool.query("UPDATE vehicles SET availability_status=$1 WHERE id=$2", ["booked", vehicle_id]);
 
    return {
      ...createBookings.rows[0],
      vehicle: {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: parseFloat(vehicle.daily_rent_price)
      }
    };
  }
   
 
};
const getAllBooking=async(role:string,userId:number)=>{
  if(role==="admin"){
     const result=await pool.query(`
        SELECT * FROM bookings
    `)
    return result.rows
  }
  if(role==="customer"){
    const result=await pool.query(`
       SELECT * FROM bookings WHERE customer_id=$1

      `,[userId])
      return result.rows
  }
  
}

export const bookingService={
    createBooking,getAllBooking
}