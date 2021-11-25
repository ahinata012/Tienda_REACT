import express from "express";
import {
  authUser,
  getPerfilUsuario,
} from "../controller/controladorUsuario.js";
import { protejer } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.route("/perfil").get(protejer, getPerfilUsuario); //aqui estamos llamando el middleware cada vez qye vayamos a esa ruta

export default router;
