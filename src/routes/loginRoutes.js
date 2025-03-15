import express  from "express";
import LoginController from "../controllers/loginController.js"


const router = express.Router();

router
 .get("/logindataget", LoginController.ListarLogin) // lista os logins do banco

 
export default router;