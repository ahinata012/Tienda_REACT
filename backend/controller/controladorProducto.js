import asyncHandler from "express-async-handler";

import Producto from "../models/modeloProducto.js";

//@descripcion  Vamos a hacer el fecth de los productos
//@route        GET /api/productos
//@acceso       esta es una ruta publica
const getProductos = asyncHandler(async (req, res) => {
  const productos = await Producto.find({});
  res.json(productos);
});

//@descripcion  Vamos a hacer el fecth de cada producto individual
//@route        GET /api/productos/:id
//@acceso       esta es una ruta publica

const getProductoByid = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (producto) {
    res.json(producto);
  } else {
    res.status(404);
    throw new Error("Producto no encontrado");
  }
});

export { getProductos, getProductoByid };
