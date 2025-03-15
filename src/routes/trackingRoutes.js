import express  from "express";
import TrakingController from "../controllers/trackingController.js";


const router = express.Router();

router
 .post("/tracking", TrakingController.CadastrarTracking) // cadastra o tracking no banco
 .post("/trackinget", TrakingController.ListarTrackingById) // lista o tracking no banco
 
 
export default router;