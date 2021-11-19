import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  reducerListaProducto,
  reducerDetallesProducto,
} from "./reducers/reducersProducto.js";
import { reducerCarrito } from "./reducers/reducersCarrito";

const reducer = combineReducers({
  listarProducto: reducerListaProducto,
  detallesProducto: reducerDetallesProducto,
  carrito: reducerCarrito,
});

const articulosCarritoDeLocalStorage = localStorage.getItem("articulosCarrito")
  ? JSON.parse(localStorage.getItem("articulosCarrito"))
  : [];

const initialState = {
  carrito: { articulosCarrito: articulosCarritoDeLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
