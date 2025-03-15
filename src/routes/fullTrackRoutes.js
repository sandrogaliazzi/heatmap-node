import express from "express";
import FullTrackController from "../controllers/fulltrackController.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router
  .get("/vehicle/:id", auth, FullTrackController.getVehicleById) // Lista veículo pelo Id
  .get("/vehicles", auth, FullTrackController.getVehicleList); // Lista todos os veículos
export default router;