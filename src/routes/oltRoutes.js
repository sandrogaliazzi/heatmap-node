import express  from "express";
import oltController from "../controllers/oltController.js";
import ReqMonitor from "../middleware/reqMonitor.js";
import OnuController from "../controllers/onuClientController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router
  .get("/ramais",auth, oltController.ListarRamais) // lista os ramais no banco.
  .post("/ramais", auth,oltController.saveRamal) 
  .post("/verificar-ramal",auth, oltController.verificarRamais) // lista os ramais no banco.
  .post("/verificar-ramal-onu-configurar", auth,oltController.VerificarOnuAConfigurarPon)
  .post("/listar-onu", auth,oltController.listarOnu)
  .post("/verificar-onu",auth, oltController.VerificarOnu)
  .post("/verificar-onu-completo", auth,oltController.VerificarOnuSummary)
  .post("/verificar-pon",auth, oltController.VerificarSinalPon)
  .post("/verificar-onu-name-pon", auth,oltController.VerificarNomeOnuPon)
  .post("/verificar-onu-name-olt",auth, oltController.VerificarNomeOnuOlt)
  .post("/liberar-onu",auth, oltController.liberarOnu)
  .post("/editar-onu",auth, OnuController.EditOnu, oltController.EditarOnu )
 
 
export default router;