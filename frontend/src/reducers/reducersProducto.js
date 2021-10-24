import {
  DETALLES_PRODUCTO_ENCONTRADA,
  DETALLES_PRODUCTO_NO_ENCONTRADA,
  REQUEST_DETALLES_PRODUCTO,
} from "../constantes/constanteProductos";

export const reducerListaProducto = (state = { productos: [] }, action) => {
  switch (action.type) {
    case "REQUEST_LISTA_PRODUCTO":
      return { loading: true, productos: [] };

    case "LISTA_PRODUCTO_ENCONTRADA":
      return { loading: false, productos: action.payload };

    case "LISTA_PRODUCTO_NO_ENCONTRADA":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const reducerDetallesProducto = (
  state = { producto: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case REQUEST_DETALLES_PRODUCTO:
      return { loading: true, ...state };

    case DETALLES_PRODUCTO_ENCONTRADA:
      return { loading: false, producto: action.payload };

    case DETALLES_PRODUCTO_NO_ENCONTRADA:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
