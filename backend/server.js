import express from "express";
import dotenv from "dotenv";
import {
  noEncontrado,
  manejadorErrores,
} from "./middleware/middlewareErrores.js";
import connectarDB from "./config/db.js";
import rutasProductos from "./routes/rutasProducto.js";
import rutasUsuario from "./routes/rutasUsuario.js";
import rutasOrdenes from "./routes/rutasOrdenes.js";

dotenv.config();

connectarDB();

const app = express();

//esto nos permite recibir data tipo json en el body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API corriendo.....");
});

app.use("/api/productos", rutasProductos);
app.use("/api/usuarios", rutasUsuario);
app.use("/api/ordenes", rutasOrdenes);

app.use(noEncontrado);

app.use(manejadorErrores);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${PORT}`
  )
);
