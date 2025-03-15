import express  from "express";
import OnuController from "../controllers/onuClientController.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router
 
 .get("/onuget",auth, OnuController.ListOnu) // lsita os dados dos equipamentos.
 .get("/allonuget",auth, OnuController.ListAllOnu)
 .delete("/allhist/:id",auth, OnuController.DeleteOnu)
 .get("/onuedit",auth, OnuController.EditOnu)
 
 
 export default router;