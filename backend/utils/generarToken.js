import jwt from "jsonwebtoken";

//aqui generamos el token que vamos a utilizar para autorizar al usuario el acceso a las rutas privadas del proyecto
//usando json web tokens

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_SECRETO, { expiresIn: "30d" });
};

export default generarToken;
