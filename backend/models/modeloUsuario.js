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

//este metodo que definimos aqui debajo es para encriptar la contraseña que el usuario nuevo que se registra ingresa
//son metodos de mongoose que usamos para encriptar la contraseña antes de guardarla
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contrasena")) {
    // con este condicional evitamos que cada vez que un usuario cambie la informacion de su cuenta 
    //se encripte de nuevo su contraseña.
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.contrasena = await bcrypt.hash(this.contrasena, salt);
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
