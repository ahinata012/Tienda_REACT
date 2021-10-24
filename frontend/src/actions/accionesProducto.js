import axios from "axios";
import {
  DETALLES_PRODUCTO_ENCONTRADA,
  DETALLES_PRODUCTO_NO_ENCONTRADA,
  REQUEST_DETALLES_PRODUCTO,
} from "../constantes/constanteProductos";

export const listarProductos = () => async (dispatch) => {
  try {
    dispatch({ type: "REQUEST_LISTA_PRODUCTO" });

    const { data } = await axios.get("/api/productos");

    dispatch({
      type: "LISTA_PRODUCTO_ENCONTRADA",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LISTA_PRODUCTO_NO_ENCONTRADA",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listarDetallesProducto = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_DETALLES_PRODUCTO });

    const { data } = await axios.get(`/api/productos/${id}`);

    dispatch({
      type: DETALLES_PRODUCTO_ENCONTRADA,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETALLES_PRODUCTO_NO_ENCONTRADA,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
