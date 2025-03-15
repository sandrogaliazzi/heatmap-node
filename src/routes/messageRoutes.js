import express from "express";
import MessageController from "../controllers/messageController.js";

const router = express.Router();

router
  .get("/list-messages", MessageController.ListMessages) // Lista os eventos
  .post("/addmessage", MessageController.AddMessage) // Adiciona ou atualiza um evento
  .delete("/delete-message/:id", MessageController.DeleteMessage);
export default router;
