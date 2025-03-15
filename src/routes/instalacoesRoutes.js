import express  from "express";
import InstalacoesController from "../controllers/instalacoesController.js";
import UploadController from "../controllers/uploadController.js";
import auth from "../middleware/auth.js";
import multer from "multer";
const upload = multer({
    dest: './CAMERAS/uploads/',
    limits: {
      fileSize: 30 * 1024 * 1024, // 30MB limit (adjust as needed)
    },
  });

const router = express.Router();

router
 .post("/instalacoes",auth, InstalacoesController.SaveInstalacao) // salva no banco os dados da instalação.
 .get("/instalacoesget", auth,InstalacoesController.FetchInstalacao)// requisita do banco os dados
 .post("/uploadimg", upload.array('image', 2), UploadController.uploadImg)
 .post("/getcameraimg",UploadController.sendImg)
 .get("/getallcameras", auth,UploadController.getCamerasimgs)
 
 export default router;