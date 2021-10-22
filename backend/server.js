const express = require("express");
const productos = require("./data/productos");

const app = express();

app.get("/", (req, res) => {
  res.send("API corriendo...");
});
app.get("/api/productos", (req, res) => {
  res.json(productos);
});
app.get("/api/productos/:id", (req, res) => {
  const producto = productos.find((p) => p._id === req.params.id);
  res.json(producto);
});
app.listen(5000, console.log("servidor corriendo en puerto 5000"));
