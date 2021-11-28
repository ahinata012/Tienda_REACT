import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copiright &copy; La Tiendita</Col>
        </Row>
        <Row>
          <Col className=" text-center">
            <a className="link__footer">
              <i className="fab fa-facebook"></i>
            </a>
            <a className="link__footer">
              <i className="fab fa-instagram"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
