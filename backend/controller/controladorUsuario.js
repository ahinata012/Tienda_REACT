import asyncHandler from "express-async-handler";
import generarToken from "../utils/generarToken.js";
import Usuario from "../models/modeloUsuario.js";

//@descripcion  Con esta Funcion vamos a autenticar el usuario y despues obtener el token de ese usuario
//@route        POST/api/usuarios/login
//@acceso       esta es una ruta publica

const authUser = asyncHandler(async (req, res) => {
  // con este req.body vamos a poder acceder al json que se envia desde el lado del frontend (body)
  // con la info del usuario.email y contrasena
  const { email, contrasena } = req.body;

  //con esto queremos encontrar un email que esté dentro de nuestro modelo de datos de usuario
  //que sea igual al email que pasamos como parametro arriba
  const usuario = await Usuario.findOne({ email: email });

  //con este condicional lo que hacemos es revisar que la contraseña ingesada como un string sea la misma que tenemos
  //encriptada en el controlador que recibimos en el body
  if (usuario && (await usuario.compararContrasena(contrasena))) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      esAdmin: usuario.esAdmin,
      token: generarToken(usuario._id), //devuelve el token con el ID de usuario como payload
    });
  } else {
    res.status(401);
    throw new Error("El Email o contraseña Ingresados Son Incorrectos");
  }
});

//@descripcion  Con esta Funcion vamos a Registrar un nuevo usuario
//@route        POST/api/usuarios
//@acceso       esta es una ruta publica

const registrarUsuario = asyncHandler(async (req, res) => {
  const { nombre, email, contrasena } = req.body;

  const usuarioExiste = await Usuario.findOne({ email: email });

  if (usuarioExiste) {
    res.status(400);
    throw new Error("El usuario ya existe");
  }
  const usuario = await Usuario.create({
    nombre,
    email,
    contrasena,
  });
  if (usuario) {
    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      esAdmin: usuario.esAdmin,
      token: generarToken(usuario._id),
    });
  } else {
    res.status(400);
    throw new Error("Datos del usuario incorrectos");
  }
});

//@descripcion  Con esta Funcion vamos a recibir la informacion del perfil del usuario
//@route        GET/api/usuarios/perfil
//@acceso       esta es una ruta PRIVADA

const getPerfilUsuario = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id);

  if (usuario) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      esAdmin: usuario.esAdmin,
    });
  } else {
    res.status(404);
    throw new Error("usuario no encontrado");
  }
});

//@descripcion  Con esta Funcion vamos a actualizar el perfil del usuario
//@route        PUT/api/usuarios/perfil
//@acceso       esta es una ruta PRIVADA

const updatePerfilUsuario = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id);

  if (usuario) {
    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.email = req.body.email || usuario.email;
    if (req.body.contrasena) {
      usuario.contrasena = req.body.contrasena;
    }
    const usuarioActualizado = await usuario.save();

    res.json({
      _id: usuarioActualizado._id,
      nombre: usuarioActualizado.nombre,
      email: usuarioActualizado.email,
      esAdmin: usuarioActualizado.esAdmin,
      token: generarToken(usuarioActualizado._id), //devuelve el token con el ID de usuario actualizado como payload
    });
  } else {
    res.status(404);
    throw new Error("usuario no encontrado");
  }
});

export { authUser, getPerfilUsuario, registrarUsuario, updatePerfilUsuario };
