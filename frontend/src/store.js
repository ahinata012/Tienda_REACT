import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  reducerListaProducto,
  reducerDetallesProducto,
} from "./reducers/reducersProducto.js";

const reducer = combineReducers({
  listarProducto: reducerListaProducto,
  detallesProducto: reducerDetallesProducto,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
