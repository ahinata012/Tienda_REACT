import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
    esAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Este metodo que definimos abajo es para comparar la contraseña ingresada (encriptada) con la contraseña que tenemos registrada
// para el usuario tmbien encriptada

usuarioSchema.methods.compararContrasena = async function (
  contrasenaIngresada
) {
  return await bcrypt.compare(contrasenaIngresada, this.contrasena);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
