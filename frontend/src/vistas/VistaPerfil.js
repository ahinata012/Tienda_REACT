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

import {
  getUsuarioDetalles,
  actualizarPerfilUsuario,
} from "../actions/accionesUsuario";

const VistaPerfil = ({ location, history }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const dispatch = useDispatch();

  const usuarioDetalles = useSelector((state) => state.usuarioDetalles);
  const { loading, error, usuario } = usuarioDetalles;

  const usuarioLogin = useSelector((state) => state.usuarioLogin);
  const { usuarioInfo } = usuarioLogin;

  const usuarioActualizarPerfil = useSelector(
    (state) => state.usuarioActualizarPerfil
  );
  const { success } = usuarioActualizarPerfil;

  useEffect(() => {
    if (!usuarioInfo) {
      history.push("/login");
    } else {
      if (!usuario.nombre) {
        dispatch(getUsuarioDetalles("perfil"));
      } else {
        setNombre(usuario.nombre);
        setEmail(usuario.email);
      }
    }
  }, [dispatch, history, usuarioInfo, usuario]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (contrasena !== confirmarContrasena) {
      setMensaje("Las contraseñas no coincide");
    } else {
      dispatch(
        actualizarPerfilUsuario({
          id: usuario._id,
          nombre,
          email,
          contrasena,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Tu perfil</h2>
        {mensaje && <Mensaje variant="danger">{mensaje}</Mensaje>}
        {error && <Mensaje variant="danger">{error}</Mensaje>}
        {success && <Mensaje variant="success">Tu Perfil Se Actualizó</Mensaje>}
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
            Actualizar
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Mis Ordenes</h2>
      </Col>
    </Row>
  );
};

export default VistaPerfil;
