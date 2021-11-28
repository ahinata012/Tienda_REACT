import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  reducerListaProducto,
  reducerDetallesProducto,
} from "./reducers/reducersProducto.js";
import { reducerCarrito } from "./reducers/reducersCarrito";
import {
  reducerUsuarioLogin,
  reducerUsuarioRegistro,
  reducerUsuarioDetalles,
  reducerUsuarioActualizarPerfil,
} from "./reducers/reducersUsuario";

const reducer = combineReducers({
  listarProducto: reducerListaProducto,
  detallesProducto: reducerDetallesProducto,
  carrito: reducerCarrito,
  usuarioLogin: reducerUsuarioLogin,
  usuarioRegistro: reducerUsuarioRegistro,
  usuarioDetalles: reducerUsuarioDetalles,
  usuarioActualizarPerfil: reducerUsuarioActualizarPerfil,
});

const articulosCarritoDeLocalStorage = localStorage.getItem("articulosCarrito")
  ? JSON.parse(localStorage.getItem("articulosCarrito"))
  : [];

const usuarioInfoDeLocalStorage = localStorage.getItem("usuarioInfo")
  ? JSON.parse(localStorage.getItem("usuarioInfo"))
  : null;

const initialState = {
  carrito: { articulosCarrito: articulosCarritoDeLocalStorage },
  usuarioLogin: { usuarioInfo: usuarioInfoDeLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
