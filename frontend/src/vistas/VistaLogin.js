import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormLabel,
  Button,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Mensaje from "../components/Mensaje";
import Cargando from "../components/Cargando";
import ContenedorFormulario from "../components/ContenedorFormulario";
import { login } from "../actions/accionesUsuario";

const VistaLogin = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const dispatch = useDispatch();

  const usuarioLogin = useSelector((state) => state.usuarioLogin);

  const { loading, error, usuarioInfo } = usuarioLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (usuarioInfo) {
      history.push(redirect);
    }
  }, [history, usuarioInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // AQUI VAMOS A ENVIAR EL LOGIN O HACER EL DISPATCH
    dispatch(login(email, contrasena));
  };

  return (
    <ContenedorFormulario>
      <h1>Iniciar Sesion</h1>
      {error && <Mensaje variant="danger">{error}</Mensaje>}
      {loading && <Cargando />}
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel> Email</FormLabel>
          <FormControl
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel> Contraseña</FormLabel>
          <FormControl
            type="password"
            placeholder="Ingrese su contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          ></FormControl>
        </FormGroup>

        <Button type="submit" variant="primary">
          Inicia Sesion
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          ¿Eres un nuevo cliente?{" "}
          <Link to={redirect ? `/registro?redirect=${redirect}` : "/registro"}>
            Registrate
          </Link>
        </Col>
      </Row>
    </ContenedorFormulario>
  );
};

export default VistaLogin;
