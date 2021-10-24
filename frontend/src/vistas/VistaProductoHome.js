import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Producto from "../components/Producto";
import Mensaje from "../components/Mensaje";
import Cargando from "../components/Cargando";
import { Row, Col } from "react-bootstrap";
import { listarProductos } from "../actions/accionesProducto";

const VistaProductoHome = () => {
  const dispatch = useDispatch();

  const listarProducto = useSelector((state) => state.listarProducto);
  const { loading, error, productos } = listarProducto;

  useEffect(() => {
    dispatch(listarProductos());
  }, [dispatch]);

  return (
    <>
      <h1> Ultimos Productos </h1>

      {loading ? (
        <Cargando />
      ) : error ? (
        <Mensaje variant="danger">{error}</Mensaje>
      ) : (
        <Row>
          {productos.map((producto) => (
            <Col key={producto._id} sm={12} md={6} lg={4}>
              <Producto producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default VistaProductoHome;
