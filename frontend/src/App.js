import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VistaProductoHome from "./vistas/VistaProductoHome";
import VistaProducto from "./vistas/VistaProducto";
import VistaCarrito from "./vistas/VistaCarrito";
import VistaQuienesSomos from "./vistas/VistaQuienesSomos";
import VistaLogin from "./vistas/VistaLogin";
import VistaRegistro from "./vistas/VistaRegistro";
import VistaPerfil from "./vistas/VistaPerfil";
import VistaEnvio from "./vistas/VistaEnvio";
import VistaPagos from "./vistas/VistaPagos";
import VistaOrdenes from "./vistas/VistaOrdenes";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/envio" component={VistaEnvio} />
          <Route path="/pago" component={VistaPagos} />
          <Route path="/ordenar" component={VistaOrdenes} />
          <Route path="/login" component={VistaLogin} />
          <Route path="/registro" component={VistaRegistro} />
          <Route path="/perfil" component={VistaPerfil} />
          <Route path="/producto/:id" component={VistaProducto} />

          <Route path="/carrito/:id?" component={VistaCarrito} />
          <Route path="/quienesSomos" component={VistaQuienesSomos} />
          <Route path="/" component={VistaProductoHome} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
