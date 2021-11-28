import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Mensaje from "../components/Mensaje";
import Cargando from "../components/Cargando";
import {
  agregarAlCarrito,
  removerDelCarrito,
} from "../actions/accionesCarrito.js";

const VistaCarrito = ({ match, location, history }) => {
  const idProducto = match.params.id;

  const cant = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const carrito = useSelector((state) => state.carrito);

  const { articulosCarrito } = carrito;

  console.log(articulosCarrito);

  useEffect(() => {
    if (idProducto) {
      dispatch(agregarAlCarrito(idProducto, cant));
    }
  }, [dispatch, idProducto, cant]);

  const removerDelCarritoHandler = (id) => {
    dispatch(removerDelCarrito(id));
  };

  const pagarArticulo = () => {
    history.push("/login?redirect=envio");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Carrito De Compras</h1>

        {articulosCarrito.length === 0 ? (
          <Mensaje>
            {" "}
            El Carrito esta vacio <Link to="/">Volver</Link>
          </Mensaje>
        ) : (
          <ListGroup variant="flush">
            {articulosCarrito.map((articulo) => (
              <ListGroupItem key={articulo.producto}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={articulo.image}
                      alt={articulo.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/producto/${articulo.producto}`}>
                      {articulo.name}
                    </Link>
                  </Col>
                  <Col md={2}>${articulo.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={articulo.cant}
                      onChange={(e) =>
                        dispatch(
                          agregarAlCarrito(
                            articulo.producto,
                            Number(e.target.value)
                          )
                        )
                      }
                    >
                      {[...Array(articulo.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        removerDelCarritoHandler(articulo.producto)
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Subtotal (
                {articulosCarrito.reduce(
                  (cont, articulo) => cont + articulo.cant,
                  0
                )}
                ) articulos
              </h2>
              $
              {articulosCarrito
                .reduce(
                  (cont, articulo) => cont + articulo.cant * articulo.price,
                  0
                )
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={articulosCarrito.length === 0}
                onClick={pagarArticulo}
              >
                Pagar
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default VistaCarrito;
