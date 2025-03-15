import express from "express";
import OsController from "../controllers/mkOsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/listar-os-reagendar",auth, OsController.listarOsReagendar);
router.get("/listar-os-atrasados",auth, OsController.listarOsAtrasados);
router.get("/listar-os-nao-resolvido",auth, OsController.listarOsNaoResolvidas);
router.get("/listar-os-nao-agendadas",auth, OsController.listarOsNaoAgendada);
router.get("/listar-os-retiradas-conector/:cto/:city",auth, OsController.listarRetiradasDeConector);
router.get("/listar-os-percurso/:id",auth, OsController.listarPercursoTecnico);


export default router;
