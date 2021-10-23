import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Producto from "../models/modeloProducto.js";

//@descripcion  Vamos a hacer el fecth de los productos
//@route        GET /api/productos
//@acceso       esta es una ruta publica

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const productos = await Producto.find({});
    res.json(productos);
  })
);

//@descripcion  Vamos a hacer el fecth de cada producto individual
//@route        GET /api/productos/:id
//@acceso       esta es una ruta publica
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id);

    if (producto) {
      res.json(producto);
    } else {
      res.status(404);
      throw new Error("Producto no encontrado");
    }
  })
);

export default router;
