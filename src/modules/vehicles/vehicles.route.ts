 import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";


 const route=Router();
 route.post("/",vehiclesController.createVehicles)
 route.get('/',vehiclesController.getAllVehicles)
 route.get('/:vehicleId',vehiclesController.getSingleVehicle)
 route.put('/:vehicleId',vehiclesController.updateVehicles)
 route.delete('/:vehicleId',vehiclesController.deleteVehicle)

 export const vehiclesRoute=route