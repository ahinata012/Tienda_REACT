import {
  CREAR_ORDEN_SUCCESS,
  CREAR_ORDEN_FAIL,
  CREAR_ORDEN_REQUEST,
} from "../constantes/constanteOrdenes";

export const reducerCrearOrden = (state = {}, action) => {
  switch (action.type) {
    case CREAR_ORDEN_REQUEST:
      return {
        loading: true,
      };

    case CREAR_ORDEN_SUCCESS:
      return {
        loading: false,
        success: true,
        orden: action.payload,
      };

    case CREAR_ORDEN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
