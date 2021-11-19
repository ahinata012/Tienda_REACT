import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Mensaje from "../components/Mensaje";
import Cargando from "../components/Cargando";
import { listarDetallesProducto } from "../actions/accionesProducto";

function VistaProducto({ history, match }) {
  const [cant, setCant] = useState(1);

  const dispatch = useDispatch();

  const detallesProducto = useSelector((state) => state.detallesProducto);
  const { loading, error, producto } = detallesProducto;
  useEffect(() => {
    dispatch(listarDetallesProducto(match.params.id));
  }, [dispatch, match]);

  const agregarAlCarrito = () => {
    history.push(`/carrito/${match.params.id}?cant=${cant}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Volver
      </Link>
      {loading ? (
        <Cargando />
      ) : error ? (
        <Mensaje variant="danger">{error}</Mensaje>
      ) : (
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
              <ListGroupItem>
                {" "}
                Descripcion: {producto.description}
              </ListGroupItem>
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

                {producto.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Cantidad</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={cant}
                          onChange={(e) => setCant(e.target.value)}
                        >
                          {[...Array(producto.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <Button
                    onClick={agregarAlCarrito}
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
      )}
    </>
  );
}

export default VistaProducto;
