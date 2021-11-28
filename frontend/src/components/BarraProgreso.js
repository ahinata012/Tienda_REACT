import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const BarraProgreso = ({ paso1, paso2, paso3, paso4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {paso1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Iniciar Sesion</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Iniciar Sesion </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {paso2 ? (
          <LinkContainer to="/envio">
            <Nav.Link>Envio</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Envio </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {paso3 ? (
          <LinkContainer to="/pago">
            <Nav.Link>Pago</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Pago </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {paso4 ? (
          <LinkContainer to="/ordenar">
            <Nav.Link>Ordenar</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> Ordenar </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default BarraProgreso;
