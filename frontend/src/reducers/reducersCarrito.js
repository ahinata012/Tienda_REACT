import {
  AGREGAR_ARTICULO_CARRITO,
  QUITAR_ARTICULO_CARRITO,
} from "../constantes/constantesCarrito";

export const reducerCarrito = (state = { articulosCarrito: [] }, action) => {
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
    default:
      return state;
  }
};
