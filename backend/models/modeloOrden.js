import mongoose from "mongoose";

const ordenSchema = mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    itemsOrdenados: [
      {
        name: { type: String, required: true },
        cantidad: { type: Number, required: false },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Producto",
        },
      },
    ],
    direccionDeEnvio: {
      direccion: { type: String, required: true },
      ciudad: { type: String, required: true },
      codigoPostal: { type: String, required: true },
      pais: { type: String, required: true },
    },
    metodoDePago: {
      type: String,
      required: true,
    },
    resultadoDelPago: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    precioIva: {
      type: Number,
      required: true,
      default: 0.0,
    },
    precioEnvio: {
      type: Number,
      required: true,
      default: 0.0,
    },
    precioTotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    estaPagado: {
      type: Boolean,
      required: true,
      default: false,
    },

    fechaDePago: {
      type: Date,
    },

    estaEnviado: {
      type: Boolean,
      required: true,
      default: false,
    },
    estaEnviado: {
      type: Boolean,
      required: true,
      default: false,
    },
    fechaDeEnvio: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Orden = mongoose.model("Orden", ordenSchema);
export default Orden;
