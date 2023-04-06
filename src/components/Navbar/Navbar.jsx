import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../state/user";

function NavScrollExample() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    axios.post("api/user/logout").then(() => {
      localStorage.removeItem("user");
      dispatch(setUser({}));
    });
  };

  const user = useSelector((state) => state.user);

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
                  <Button
                    className="button-position"
                    href="/login"
                    variant="outline-light "
                  >
                    Iniciar Sesión
                  </Button>

                  <Button
                    className="button-position"
                    href="/register"
                    variant="outline-light "
                  >
                    Registrarme
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavScrollExample;
