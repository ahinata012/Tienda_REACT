import express from "express";
import {
  getProductoByid,
  getProductos,
} from "../controller/controladorProducto.js";
const router = express.Router();

router.route("/").get(getProductos);
router.route("/:id").get(getProductoByid);

export default router;
