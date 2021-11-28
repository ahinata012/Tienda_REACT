import {
  AGREGAR_ARTICULO_CARRITO,
  QUITAR_ARTICULO_CARRITO,
  CARRITO_GUARDAR_DIRECCION_ENVIO,
  CARRITO_GUARDAR_METODO_PAGO,
} from "../constantes/constantesCarrito";

export const reducerCarrito = (
  state = { articulosCarrito: [], direccionDeEnvio: {} },
  action
) => {
  switch (action.type) {
    case AGREGAR_ARTICULO_CARRITO:
      const articulo = action.payload;

      const articuloExiste = state.articulosCarrito.find(
        (x) => x.producto === articulo.producto
      );

      if (articuloExiste) {
        return {
          ...state,
          articulosCarrito: state.articulosCarrito.map((x) =>
            x.producto === articuloExiste.producto ? articulo : x
          ),
        };
      } else {
        return {
          ...state,
          articulosCarrito: [...state.articulosCarrito, articulo],
        };
      }
    case QUITAR_ARTICULO_CARRITO:
      return {
        ...state,
        articulosCarrito: state.articulosCarrito.filter(
          (x) => x.producto !== action.payload
        ),
      };
    case CARRITO_GUARDAR_DIRECCION_ENVIO:
      return {
        ...state,
        direccionDeEnvio: action.payload,
      };
    case CARRITO_GUARDAR_METODO_PAGO:
      return {
        ...state,
        metodoDePago: action.payload,
      };
    default:
      return state;
  }
};
