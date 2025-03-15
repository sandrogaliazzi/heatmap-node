import express from "express";
import CableController from "../controllers/cableController.js";


const router = express.Router();

router
  .get("/cables", CableController.ListCables) // Lista os cabos do tomodat
export default router;