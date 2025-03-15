import express  from "express";
import fetchController from "../controllers/fetchController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router
 .get("/fetch", fetchController.ListarFetch) // lista o fetch do banco
 //.get("/cadastrofetch", fetchController.CadastrarFetch) // executa o fetch no tomodat e cadastra no banco
 //.get("/updatefetch1", fetchController.UpdateFetch) // executa o fetch no tomodat e atualiza as info no banco
 .get("/fetchwithctoclient",auth, fetchController.FetchWithCtoCLient) // pega o fetch no banco e agrega com as localizações já cadastradas dos clientes
 .get("/fetchwithctoclientpppoe",auth, fetchController.FetchWithCtoClientsPppoe)
 .get("/fetchwithpppoeinsideclients",auth, fetchController.FetchWithCtoClientsPppoeInsideClients) // 
 // .get("/newfetch", fetchController.FetchWithCtoClientsPppoeInsideClientsNewCollection) // popula a nova coleção
 .get("/newfetch",auth, fetchController.ListarFetchNew) // new fetch with pppoe
 .get("/updatefetchnew",auth, fetchController.newfetchupdate) // update the coletion, agregate fetch + pppoe and populate new fetch.
 .get("/comparefetchtopppoeanddelete",auth, fetchController.ListarFetchPppoeAndDelete) // compara duas tabelas e exclui da tabela pppoe o que não existe na fetch.
 export default router;