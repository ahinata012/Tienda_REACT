import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Producto = ({ producto }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/producto/${producto._id}`}>
        <Card.Img src={producto.image} variant="top"></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/producto/${producto._id}`}>
          <Card.Title as="div">
            <strong>{producto.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={producto.rating}
            text={`${producto.numReviews} calificaciones `}
          />
        </Card.Text>
        <Card.Text as="h3">${producto.price} </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Producto;
