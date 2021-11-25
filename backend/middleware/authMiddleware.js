//con este middleware vamos a estar validando el token que recibimos
import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import Usuario from "../models/modeloUsuario.js";

const protejer = AsyncHandler(async (req, res, next) => {
  let token;
  // con esto vamos a recibir el token que devolvimos una vez autorizamos el usuario,
  // basicamente recibimos el token que enviamos en el POST para devolverlo en alguna ruta especifica

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRETO); //ESTO ES PARA RECIBIR OBJETO QUE SE RETORNA CON EL TOKEN DECODIFICADO CON EL ID DEL USUARIO
      req.usuario = await Usuario.findById(decoded.id).select("-contrasena");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("No Autorizado, el token ha falllado");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No autorizado. no token");
  }
});

export { protejer };
