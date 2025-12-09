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
    const result = await pool.query(`SELECT * FROM bookings`);
    if(role==="admin"){
     const bookings = await Promise.all(
        result.rows.map(async book => {
            const customerRes = await pool.query(
                `SELECT name,email FROM users WHERE id=$1`,
                [book.customer_id]
            );
            const customer = customerRes.rows[0];

            const vehicleRes = await pool.query(
                `SELECT vehicle_name, registration_number FROM vehicles WHERE id=$1`,
                [book.vehicle_id]
            );
            const vehicle = vehicleRes.rows[0];

            return {
                ...book,
                customer,
                vehicle
            };
        })
    );

    return bookings;
   
  }
  
  if(role==="customer"){
    const result=await pool.query(`
       SELECT * FROM bookings WHERE customer_id=$1

      `,[userId])
      const bookings = await Promise.all(
        result.rows.map(async book => {
            const vehicleRes = await pool.query(
                `SELECT vehicle_name, registration_number,type FROM vehicles WHERE id=$1`,
                [book.vehicle_id]
            );
            const vehicle = vehicleRes.rows[0];

            return {
                ...book,
                vehicle
            };
        })
    );

    return bookings;
  }
  
}
const updateBooking = async (
  bookingId: number,
  status: string,
  role: string,
  userId: number
) => {
 
  const existing = await pool.query(
    `SELECT * FROM bookings WHERE id=$1`,
    [bookingId]
  );

  if (existing.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const booking = existing.rows[0];

  //  CUSTOMER Logic 
  if (role === "customer") {
    // customer can cancel only his own booking
    if (booking.customer_id !== userId) {
      throw new Error("You are not allowed to cancel this booking");
    }

    if (status !== "cancelled") {
      throw new Error("Customers can only cancel bookings");
    }

    const updated = await pool.query(
      `
      UPDATE bookings 
      SET status='cancelled'
      WHERE id=$1
      RETURNING *
    `,
      [bookingId]
    );

    return updated.rows[0];
  }


  if (role === "admin") {
    if (status !== "returned") {
      throw new Error("Admin can only mark booking as returned");
    }

    // Update booking to returned
    const updatedBooking = await pool.query(
      `
      UPDATE bookings 
      SET status='returned'
      WHERE id=$1
      RETURNING *
    `,
      [bookingId]
    );

    // Update vehicle availability
    await pool.query(
      `
      UPDATE vehicles 
      SET availability_status='available'
      WHERE id=$1
    `,
      [booking.vehicle_id]
    );

    return {
      ...updatedBooking.rows[0],
      vehicle: { availability_status: "available" },
    };
  }
};

export const bookingService={
    createBooking,getAllBooking,updateBooking 
}