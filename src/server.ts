import express from "express"
import  { Request, Response } from "express"
import { initDb } from "./database/db"
import app from "./app"
// import { userRoute } from "./modules/user/user.route"
import { authRoute } from "./modules/auth/auth.route"
import { userRoute } from "./modules/user/user.route"
import { vehiclesRoute } from "./modules/vehicles/vehicles.route"
//body parse
app.use(express.json())
// database initialize
initDb()

// root route
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

// user route
app.use('/api/v1/users',userRoute)

//auth route
app.use("/api/v1/auth",authRoute)
//vehicles route
app.use("/api/v1/vehicles",vehiclesRoute)


