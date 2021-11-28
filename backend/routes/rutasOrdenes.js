import express from "express";
import { agregarArticulosOrdenados } from "../controller/controladorOrdenes.js";
import { protejer } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protejer, agregarArticulosOrdenados);

export default router;
