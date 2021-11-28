import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  Button,
  FormControl,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import ContenedorFormulario from "../components/ContenedorFormulario";
import BarraProgreso from "../components/BarraProgreso";
import { guardarMetodoDePago } from "../actions/accionesCarrito";

const VistaPagos = ({ history }) => {
  const carrito = useSelector((state) => state.carrito);
  const { direccionDeEnvio } = carrito;

  if (!direccionDeEnvio) {
    history.push("/envio");
  }

  const [metodoDePago, setMetodoDePago] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(guardarMetodoDePago(metodoDePago));

    history.push("/ordenar");
  };

  return (
    <ContenedorFormulario>
      <BarraProgreso paso1 paso2 paso3 />
      <h1>Metodo de Pago</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as="legend"> Seleccione un Metodo</FormLabel>

          <Col>
            <Form.Check
              type="radio"
              label="Paypal o Tarjeta de Credito"
              id="PayPal"
              name="metodoDePago"
              value="PayPal"
              checked
              onChange={(e) => setMetodoDePago(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="Upay"
              id="Upay"
              name="metodoDePago"
              value="Upay"
              checked
              onChange={(e) => setMetodoDePago(e.target.value)}
            ></Form.Check> */}
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          Continuar
        </Button>
      </Form>
    </ContenedorFormulario>
  );
};

export default VistaPagos;
