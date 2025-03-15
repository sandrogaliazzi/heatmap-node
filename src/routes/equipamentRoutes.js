import express  from "express";
import equipamentController from "../controllers/equipamentClientController.js";


const router = express.Router();

router
 .post("/equipamentcadastro", equipamentController.equipamenteSave) // salva no banco os dados do equipamento.
 .get("/equipamentget", equipamentController.FetchEquipament) // lsita os dados dos equipamentos.
 .put("/equipamentatualizar/:id", equipamentController.atualizarEquipament) // update equipamento, id no params e dados no body dados.
 .delete("/equipamentdelete", equipamentController.excluirEquipament) // deleta equipamento, id no params. 
 export default router;