import React from "react";
import { Spinner } from "react-bootstrap";

const Cargando = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Cargando...</span>
    </Spinner>
  );
};

export default Cargando;
