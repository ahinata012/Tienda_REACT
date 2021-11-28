import axios from "axios";
import {
  CREAR_ORDEN_REQUEST,
  CREAR_ORDEN_SUCCESS,
  CREAR_ORDEN_FAIL,
} from "../constantes/constanteOrdenes";

export const ordenCrear = (orden) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREAR_ORDEN_REQUEST,
    });

    const {
      usuarioLogin: { usuarioInfo },
    } = getState();
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${usuarioInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/ordenes`, orden, config);

    dispatch({
      type: CREAR_ORDEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREAR_ORDEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
