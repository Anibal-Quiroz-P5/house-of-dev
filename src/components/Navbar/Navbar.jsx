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
import { useState, useEffect } from "react";
import { NavItem } from "react-bootstrap";

function NavScrollExample() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLogueado);
  }, []);

  const handleLogout = () => {
    axios.post("api/user/logout").then(() => {
      localStorage.removeItem("user");
      setUser({});
    });
  };

  return (
    <>
      <Navbar className="navbar" expand="lg">
        <Container>
          <Link to="/" className="link">
            <Navbar.Brand>House of Dev</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/venta" className="nav-link">
                Venta
              </Link>
              <Link to="/alquiler" className="nav-link">
                Alquiler
              </Link>
              <Link to="/nosotros" className="nav-link">
                Nosotros
              </Link>
              <Link to="/contacto" className="nav-link">
                Contacto
              </Link>
              {user.is_admin ? (
                <NavDropdown title="Panel de Control" id="basic-nav-dropdown">
                  <Link to="/users" className="nav-link">
                    Usuarios
                  </Link>
                  <Link to="/citas" className="nav-link">
                    Citas
                  </Link>
                  <Link to="/propiedades" className="nav-link">
                    Propiedades
                  </Link>
                </NavDropdown>
              ) : null}
              {user.first_name ? (
                <NavDropdown title={user.first_name} id="basic-nav-dropdown">
                  <Link to="/visitas-agendadas" className="link-perfil">
                    Visitas Agendadas
                  </Link>

                  <Link to="/favoritos" className="link-perfil">
                    Favoritos
                  </Link>
                  <Link to="/userview" className="link-perfil">
                    Mi Perfil
                  </Link>
                  <NavDropdown.Divider />
                  <Link
                    to="/login"
                    className="link-perfil"
                    user={user}
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </NavDropdown>
              ) : (
                <>
                  <Link to="/login" className="link">
                    <Button
                      className="button-position"
                      variant="outline-light "
                    >
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/register" className="link">
                    {" "}
                    <Button
                      className="button-position"
                      variant="outline-light "
                    >
                      Registrarme
                    </Button>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <nav className="navbar navbar-expand-lg navbar-light">
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
            {!user.id ? (
              <>
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
              </>
            ) : (
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  <button
                    className="btn-reg"
                    user={user}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav> */}
    </>
  );
}

export default NavScrollExample;
