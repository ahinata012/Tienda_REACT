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
import { registro } from "../actions/accionesUsuario";

const VistaRegistro = ({ location, history }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const dispatch = useDispatch();

  const usuarioRegistro = useSelector((state) => state.usuarioRegistro);

  const { loading, error, usuarioInfo } = usuarioRegistro;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (usuarioInfo) {
      history.push(redirect);
    }
  }, [history, usuarioInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // AQUI VAMOS A ENVIAR EL registro del nuevo usuario O HACER EL DISPATCH
    // dispatch(registro(nombre, email, contrasena));
    if (contrasena !== confirmarContrasena) {
      setMensaje("Las contraseñas no coincide");
    } else {
      dispatch(registro(nombre, email, contrasena));
    }
  };

  return (
    <ContenedorFormulario>
      <h1>Registrate</h1>
      {mensaje && <Mensaje variant="danger">{mensaje}</Mensaje>}
      {error && <Mensaje variant="danger">{error}</Mensaje>}
      {loading && <Cargando />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="nombre">
          <FormLabel> Nombre</FormLabel>
          <FormControl
            type="name"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup>
          <FormLabel> Email</FormLabel>
          <FormControl
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="contrasena">
          <FormLabel> Contraseña</FormLabel>
          <FormControl
            type="password"
            placeholder="Ingrese su contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="confirmarContrasena">
          <FormLabel> Confirmar Contraseña</FormLabel>
          <FormControl
            type="password"
            placeholder="Confirme su contraseña"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
          ></FormControl>
        </FormGroup>

        <Button type="submit" variant="primary">
          Registrar
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          ¿Ya tienes una cuenta?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Inicia Sesion
          </Link>
        </Col>
      </Row>
    </ContenedorFormulario>
  );
};

export default VistaRegistro;
