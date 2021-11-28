import asyncHandler from "express-async-handler";
import Orden from "../models/modeloOrden.js";

//@descripcion  Vamos a hacer la funcion para crear una nueva order
//@route        GET /api/ordenes
//@acceso       esta es una ruta privada
const agregarArticulosOrdenados = asyncHandler(async (req, res) => {
  const {
    itemsOrdenados,
    direccionDeEnvio,
    metodoDePago,
    precioArticulos,
    precioIva,
    precioEnvio,
    precioTotal,
  } = req.body;

  if (itemsOrdenados && itemsOrdenados.length === 0) {
    res.status(400);
    throw new Error("No hay Articulos Ordenados");
    return;
  } else {
    const orden = new Orden({
      itemsOrdenados,
      usuario: req.usuario._id,
      direccionDeEnvio,
      metodoDePago,
      precioArticulos,
      precioIva,
      precioEnvio,
      precioTotal,
    });

    const ordenCreada = await orden.save();

    res.status(201).json(ordenCreada);
  }
});

export { agregarArticulosOrdenados };
