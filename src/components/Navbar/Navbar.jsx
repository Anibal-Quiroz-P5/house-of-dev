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
    // <Navbar classNameName="fondo" expand="lg">
    //   <Container fluid>
    //     <Navbar.Brand href="#">House of Dev</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="navbarScroll" />
    //     <Navbar.Collapse id="navbarScroll">
    //       <Nav
    //         className="me-auto my-2 my-lg-0"
    //         style={{ maxHeight: "100px" }}
    //         navbarScroll
    //       >
    //         <Nav.Link className="btn-nav" href="/">
    //           Inicio
    //         </Nav.Link>
    //         <Nav.Link href="#action2">Nosotros</Nav.Link>
    //         <Nav.Link href="#action2">Venta</Nav.Link>
    //         <Nav.Link href="#action2">Alquiler</Nav.Link>
    //         <Link to="/contacto">
    //           {" "}
    //           <Nav.Link>Contacto</Nav.Link>
    //         </Link>
    //         <Link to=""></Link>
    //         <Link to=""></Link>
    //         <Link to=""></Link>

    //         <Link to="/register">
    //           <Button className="btn-reg " variant="outline-light">
    //             Register
    //           </Button>
    //         </Link>
    //         <Link to="/login">
    //           <Button variant="outline-light">Login</Button>
    //         </Link>

    //         <Button variant="outline-light" user={user} onClick={handleLogout}>
    //           Logout
    //         </Button>

    //         <NavDropdown title="Mi Perfil" id="navbarScrollingDropdown">
    //           <NavDropdown.Item href="#action3">Editar Perfil</NavDropdown.Item>
    //           <NavDropdown.Item href="#action4">Logout</NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //     <Form className="d-flex">
    //       <Form.Control
    //         type="search"
    //         placeholder="Busca tu propiedad"
    //         className="me-2"
    //         aria-label="Search"
    //       />

    //       <Button variant="outline-light">Buscar</Button>
    //     </Form>
    //   </Container>
    // </Navbar>
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link to="/" className="navbar-brand">
          House of Dev
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/propiedades-venta" className="nav-link">
                En venta
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/propiedades-alquiler" className="nav-link">
                Alquiler
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/agenda-tu-visita" className="nav-link">
                Agendá tu visita
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/nosotros" className="nav-link">
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link">
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mi-perfil" className="nav-link">
                Mi perfil
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                <button className="btn-reg">Registro</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <button className="btn-reg">Login</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                <button className="btn-reg" user={user} onClick={handleLogout}>
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavScrollExample;
