import express from "express";
import RamalLogsController from "../controllers/ramalLogsController.js";

const router = express.Router();

router.post("/ramal-log-register", RamalLogsController.SaveRamalLog); // salva no banco os dados do pppoe.
router.get("/find-ramal-logs/:id", RamalLogsController.FindRamalLogs); //retorna ramais no banco
export default router;
