 import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";


 const route=Router();
 route.post("/",auth("admin"),vehiclesController.createVehicles)
 route.get('/',vehiclesController.getAllVehicles)
 route.get('/:vehicleId',vehiclesController.getSingleVehicle)
 route.put('/:vehicleId',auth("admin"),vehiclesController.updateVehicles)
 route.delete('/:vehicleId',vehiclesController.deleteVehicle)

 export const vehiclesRoute=route