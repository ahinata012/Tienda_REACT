import express from "express";
import {
  authUser,
  registrarUsuario,
  getPerfilUsuario,
  updatePerfilUsuario,
} from "../controller/controladorUsuario.js";
import { protejer } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registrarUsuario);
router.post("/login", authUser);
router
  .route("/perfil")
  .get(protejer, getPerfilUsuario)
  .put(protejer, updatePerfilUsuario); //aqui estamos llamando el middleware cada vez qye vayamos a esa ruta

export default router;
