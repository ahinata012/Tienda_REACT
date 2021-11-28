import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Mensaje from "../components/Mensaje";
import BarraProgreso from "../components/BarraProgreso";

const VistaOrdenes = () => {
  const carrito = useSelector((state) => state.carrito);
  //calcular los precios
  const agregarDecimales = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  carrito.precioArticulos = agregarDecimales(
    carrito.articulosCarrito.reduce(
      (cont, item) => cont + item.price * item.cant,
      0
    )
  );

  carrito.precioEnvio = agregarDecimales(
    carrito.precioArticulos > 100 ? 0 : 100
  );
  carrito.precioIva = agregarDecimales(
    Number((0.19 * carrito.precioArticulos).toFixed(2))
  );

  carrito.precioTotal = (
    Number(carrito.precioArticulos) +
    Number(carrito.precioEnvio) +
    Number(carrito.precioIva)
  ).toFixed(2);

  const ordenarHandler = () => {
    console.log("order");
  };

  return (
    <>
      <BarraProgreso paso1 paso2 paso3 paso4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Envio</h2>
              <p>
                <strong>Direccion: </strong>
                {carrito.direccionDeEnvio.direccion} , {""}
                {carrito.direccionDeEnvio.ciudad} , {""}
                {carrito.direccionDeEnvio.codigoPostal} , {""}
                {carrito.direccionDeEnvio.pais}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Metodo de Pago</h2>
              <strong>Metodo: </strong>
              {carrito.metodoDePago}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Articulos Ordenados</h2>
              {carrito.articulosCarrito.length === 0 ? (
                <Mensaje> Tu Carrito está Vacío </Mensaje>
              ) : (
                <ListGroup variant="flush">
                  {carrito.articulosCarrito.map((articulo, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={articulo.image}
                            alt={articulo.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/producto/${articulo.producto}`}>
                            {articulo.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {articulo.cant} x ${articulo.price} = $
                          {articulo.cant * articulo.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2> Resumen de la Orden</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Articulos</Col>
                  <Col>${carrito.precioArticulos}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Envio</Col>
                  <Col>${carrito.precioEnvio}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Iva</Col>
                  <Col>${carrito.precioIva}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${carrito.precioTotal}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={carrito.articulosCarrito === 0}
                  onClick={ordenarHandler}
                >
                  Ordenar
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default VistaOrdenes;
