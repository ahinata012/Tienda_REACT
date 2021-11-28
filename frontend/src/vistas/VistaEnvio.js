import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ContenedorFormulario from "../components/ContenedorFormulario";
import BarraProgreso from "../components/BarraProgreso";
import { guardarDireccionDeEnvio } from "../actions/accionesCarrito";

const VistaEnvio = ({ history }) => {
  const carrito = useSelector((state) => state.carrito);
  const { direccionDeEnvio } = carrito;

  const [direccion, setDireccion] = useState(direccionDeEnvio.direccion);
  const [ciudad, setCiudad] = useState(direccionDeEnvio.ciudad);
  const [codigoPostal, setCodigoPostal] = useState(
    direccionDeEnvio.codigoPostal
  );
  const [pais, setPais] = useState(direccionDeEnvio.pais);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      guardarDireccionDeEnvio({ direccion, ciudad, codigoPostal, pais })
    );

    history.push("/pago");
  };

  return (
    <ContenedorFormulario>
      <BarraProgreso paso1 paso2 />
      <h1>Envio</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="direccion">
          <FormLabel> Dirección</FormLabel>
          <FormControl
            type="text"
            placeholder="Ingrese su direccion"
            value={direccion}
            required
            onChange={(e) => setDireccion(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="ciudad">
          <FormLabel> Ciudad</FormLabel>
          <FormControl
            type="text"
            placeholder="Ingrese su Ciudad"
            value={ciudad}
            required
            onChange={(e) => setCiudad(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="codigoPostal">
          <FormLabel> Codigo Postal</FormLabel>
          <FormControl
            type="text"
            placeholder="Ingrese su Codigo Postal"
            value={codigoPostal}
            required
            onChange={(e) => setCodigoPostal(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="pais">
          <FormLabel> Pais</FormLabel>
          <FormControl
            type="text"
            placeholder="Ingrese su Pais"
            value={pais}
            required
            onChange={(e) => setPais(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary">
          Continuar
        </Button>
      </Form>
    </ContenedorFormulario>
  );
};

export default VistaEnvio;
