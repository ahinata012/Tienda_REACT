import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/accionesUsuario";
const Header = () => {
  const dispatch = useDispatch();
  const usuarioLogin = useSelector((state) => state.usuarioLogin);

  const { usuarioInfo } = usuarioLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>La Tiendita</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/carrito">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"> </i>Carrito
                </Nav.Link>
              </LinkContainer>
              {usuarioInfo ? (
                <NavDropdown title={usuarioInfo.nombre} id="username">
                  <LinkContainer to="/perfil">
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Cerrar Sesion{" "}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"> </i>Inicia Sesion
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/quienesSomos">
                <Nav.Link>¿Quienes Somos?</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
