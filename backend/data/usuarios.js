import bcrypt from "bcryptjs";

const usuarios = [
  {
    nombre: "Usuario Admin",
    email: "admin@utp.edu.com",
    contrasena: bcrypt.hashSync("123456", 10),
    esAdmin: true,
  },
  {
    nombre: "Tripulante 1",
    email: "tripulante1@utp.edu.com",
    contrasena: bcrypt.hashSync("123456", 10),
  },
  {
    nombre: "Tripulante 2",
    email: "tripulante2@utp.edu.com",
    contrasena: bcrypt.hashSync("123456", 10),
  },
];

export default usuarios;
