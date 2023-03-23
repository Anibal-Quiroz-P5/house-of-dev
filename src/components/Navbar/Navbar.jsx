import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function NavScrollExample() {
  const [user, setUser] = useState({});

  const handleLogout = () => {
    axios.post("api/user/logout").then(() => {
      localStorage.removeItem("user");
      setUser({});
    });
  };

  return (
    <Navbar className="fondo" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">House of Dev</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="btn-nav" href="/">
              Inicio
            </Nav.Link>
            <Nav.Link href="#action2">Nosotros</Nav.Link>
            <Nav.Link href="#action2">Venta</Nav.Link>
            <Nav.Link href="#action2">Alquiler</Nav.Link>
            <Nav.Link href="#action2">Contacto</Nav.Link>
            <Link to="/register">
              <Button className="btn-reg " variant="outline-light">
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline-light">Login</Button>
            </Link>

            <Button variant="outline-light" user={user} onClick={handleLogout}>
              Logout
            </Button>

            <NavDropdown title="Mi Perfil" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Editar Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Busca tu propiedad"
            className="me-2"
            aria-label="Search"
          />

          <Button variant="outline-light">Buscar</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
