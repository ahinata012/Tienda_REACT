import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

function VistaProducto({ match }) {
  const [producto, pintarProducto] = useState({});

  useEffect(() => {
    const fetchProducto = async () => {
      const { data } = await axios.get(`/api/productos/${match.params.id}`);

      pintarProducto(data);
    };

    fetchProducto();
  }, [match]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Volver
      </Link>
      <Row>
        <Col md={6}>
          <Image src={producto.image} alt={producto.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{producto.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={producto.rating}
                text={`${producto.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${producto.price}</ListGroupItem>
            <ListGroupItem> Descripcion: {producto.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Precio:</Col>
                  <Col>
                    <strong>${producto.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Estado</Col>
                  <Col>
                    {producto.countInStock > 0 ? "Disponible" : "Agotado"}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={producto.countInStock === 0}
                >
                  Agregar al Carrito
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default VistaProducto;
