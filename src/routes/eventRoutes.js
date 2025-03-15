import express from "express";
import EventController from "../controllers/eventController.js";

const router = express.Router();

router
  .get("/listevents", EventController.ListEvent) // Lista os eventos
  .post("/addevent", EventController.AddEvent); // Adiciona ou atualiza um evento
export default router;
