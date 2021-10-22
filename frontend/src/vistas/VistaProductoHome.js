import React, { useState, useEffect } from "react";

import Producto from "../components/Producto";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const VistaProductoHome = () => {
  const [productos, pintarProductos] = useState([]);
  useEffect(() => {
    const fetchProductos = async () => {
      const { data } = await axios.get("/api/productos");

      pintarProductos(data);
    };

    fetchProductos();
  }, []);
  return (
    <>
      <h1> Ultimos Productos </h1>

      <Row>
        {productos.map((producto) => (
          <Col key={producto._id} sm={12} md={6} lg={4}>
            <Producto producto={producto} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default VistaProductoHome;
