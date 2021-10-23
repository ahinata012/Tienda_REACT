import mongoose from "mongoose";
import dotenv from "dotenv";
import usuarios from "./data/usuarios.js";
import productos from "./data/productos.js";
import Usuario from "./models/modeloUsuario.js";
import Producto from "./models/modeloProducto.js";
import Orden from "./models/modeloOrden.js";
import connectarDB from "./config/db.js";

dotenv.config();

connectarDB();

const importarDatos = async () => {
  try {
    await Orden.deleteMany();
    await Producto.deleteMany();
    await Usuario.deleteMany();

    const usuariosCreados = await Usuario.insertMany(usuarios);
    const usuarioAdmin = usuariosCreados[0]._id;
    const productosEjemplo = productos.map((producto) => {
      return { ...producto, usuario: usuarioAdmin };
    });
    await Producto.insertMany(productosEjemplo);

    console.log("Datos Importados con Exito ");
    process.exit();
  } catch (error) {
    console.error(`${error}`);

    process.exit(1);
  }
};
const eliminarDatos = async () => {
  try {
    await Orden.deleteMany();
    await Producto.deleteMany();
    await Usuario.deleteMany();

    console.log("Datos Eliminados");
    process.exit();
  } catch (error) {
    console.error(`${error}`);

    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  eliminarDatos();
} else {
  importarDatos();
}
