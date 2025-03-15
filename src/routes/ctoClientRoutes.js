import express  from "express";
import CtoClientController from "../controllers/ctoClientController.js";
import auth from "../middleware/auth.js";
import CtoClientLogController from "../controllers/ctoClientClogController.js";
import LogClientController from "../controllers/logsController.js";

const router = express.Router();

router
 .post("/ctoclient",auth, CtoClientLogController.CadastrarCtoClientLogN, CtoClientController.CadastrarCtoClient) // cadastra o cliente no banco
 .get("/ctoclient", auth, CtoClientController.ListarCtoClient) //lista todos os clientes no banco
 .get("/ctoclientlog",auth,  LogClientController.ListarLogCtoClient) //lista todos os logs clientes no banco
 .post("/ctoclientid", auth, CtoClientController.ListarCtoClientById) //recebe cto_id e name e retorna link ou false
 .post("/updatectoclient",auth, CtoClientLogController.CadastrarCtoClientLogN, CtoClientController.UpdateCtoClientById) //recebe dados e atualiza no banco.
 .delete("/deletectolog/:id",auth, LogClientController.deleteCtoClientLog) //recebe "name": "SANDRO3 07/03" e deleta.
 .delete("/deletectoclient/:id",auth, CtoClientController.deleteCtoClient) // recebe id no parametro e deleta o cliente do banco
export default router;