import React from "react";
import "./Alquiler.css";
import { Grid } from "../../commons/Grid/Grid";
import {
  Accordion,
  Button,
  Col,
  Row,
  Form,
  Container,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BiBed, BiBath, BiPhoneCall } from "react-icons/bi";
import { RxRulerSquare } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";

export const Alquiler = () => {
  const [user, setUser] = useState({});
  const [tipoDePropiedad, setTipoDePropiedad] = useState("");

  /// Propiedades ///
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("/api/property/condition/alquiler")
      .then((res) => {
        setProperties(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  ///

  /// User ///
  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLogueado);
  }, []);
  ///

  /// Filtros por Tipo ///
  const handleChange = (e) => {
    setTipoDePropiedad(e.target.value);
  };

  const handleFilterTipoDeProps = (e) => {
    e.preventDefault();
    axios
      .get(`/api/property/type/${tipoDePropiedad}/`)
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ///

  /// Filtros por Precio ///

  const handleFilterPrecioMenorAMayor = (e) => {
    const sorted = [...properties].sort((a, b) => {
      return a.price - b.price;
    });
    e.preventDefault();
    axios
      .get(`/api/property/condition/alquiler`)
      .then((res) => {
        setProperties(sorted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterPrecioMayorAMenor = (e) => {
    const sorted = [...properties].sort((a, b) => {
      return b.price - a.price;
    });
    e.preventDefault();
    axios
      .get(`/api/property/condition/alquiler`)
      .then((res) => {
        setProperties(sorted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///
  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        <Row>
          <Col
            sm={12}
            style={{
              border: "2px solid #123acb",
              marginTop: "3%",
              padding: "10px",
              color: "#123acb",
              fontFamily: "Montserrat",
              fontWeight: "900",
            }}
          >
            PROPIEDADES EN ALQUILER
          </Col>
        </Row>
      </div>
      <Row className="row-filter">
        <Col sm={6}>
          <Accordion
            className="acordion"
            style={{
              border: "2px solid #123acb",
              marginTop: "3%",
              padding: "10px",
              color: "#123acb",
              fontFamily: "Montserrat",
              fontWeight: "900",
              width: "30%",
            }}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Filtrar por precio</Accordion.Header>
              <Accordion.Body>
                <Button
                  variant="primary"
                  href="/alquiler"
                  onClick={handleFilterPrecioMenorAMayor}
                >
                  Precio Menor a Mayor{" "}
                </Button>
                <Button
                  variant="primary"
                  href="/alquiler"
                  onClick={handleFilterPrecioMayorAMenor}
                >
                  Precio Mayor a Menor{" "}
                </Button>
                <Button variant="primary" href="/alquiler">
                  Borrar Filtro
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col sm={6}>
          <Accordion
            className="acordion"
            style={{
              border: "2px solid #123acb",
              marginTop: "3%",
              padding: "10px",
              color: "#123acb",
              fontFamily: "Montserrat",
              fontWeight: "900",
              width: "30%",
            }}
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Tipo de propiedad</Accordion.Header>
              <Accordion.Body>
                <div class="form-check form-switch">
                  <input
                    onChange={handleChange}
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    value="casa"
                    checked={tipoDePropiedad == "casa" ? true : false}
                  ></input>
                  <label class="form-check-label" for="flexSwitchCheckDefault">
                    Casa
                  </label>
                </div>
                <div class="form-check form-switch">
                  <input
                    onChange={handleChange}
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    value="departamento"
                    checked={tipoDePropiedad == "departamento" ? true : false}
                  ></input>
                  <label class="form-check-label" for="flexSwitchCheckChecked">
                    Departamento
                  </label>
                </div>
                <div class="form-check form-switch">
                  <input
                    onChange={handleChange}
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDisabled"
                    value="duplex"
                    checked={tipoDePropiedad == "duplex" ? true : false}
                  ></input>
                  <label class="form-check-label" for="flexSwitchCheckDisabled">
                    Duplex
                  </label>
                </div>
                <div class="form-check form-switch">
                  <input
                    onChange={handleChange}
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDisabled"
                    value="ph"
                    checked={tipoDePropiedad == "ph" ? true : false}
                  ></input>
                  <label class="form-check-label" for="flexSwitchCheckDisabled">
                    PH
                  </label>
                </div>
                <div class="form-check form-switch">
                  <input
                    onChange={handleChange}
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDisabled"
                    value="terreno"
                    checked={tipoDePropiedad == "terreno" ? true : false}
                  ></input>
                  <label class="form-check-label" for="flexSwitchCheckDisabled">
                    Terreno
                  </label>
                </div>
                <Button variant="primary" onClick={handleFilterTipoDeProps}>
                  Filtrar
                </Button>
                <Button variant="primary" href="/alquiler">
                  Borrar Filtro
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        {user.first_name ? (
          <Link to={"/favoritos"}>
            <Button className="buttonFav">
              {" "}
              Favoritos
              <MdFavoriteBorder className="fav" />
            </Button>
          </Link>
        ) : null}
      </div>
      <div className="banner-inicio">
        <img
          src="https://images.pexels.com/photos/7512042/pexels-photo-7512042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="mx-auto d-block"
          alt="Responsive image"
          style={{ marginTop: "4%", marginBottom: "2%" }}
          height={"450px"}
          width={"80%"}
        ></img>
      </div>
      <hr className="hr-separador" />
      <section>
        <Container className="cont-grid">
          <Row className="row-grid">
            {properties.map((propiedad) => {
              return (
                <Col className="col-grid col-md-offset-2" sm={6}>
                  <Card.Body>
                    <Row>
                      <Col className="col-grid" sm={12}>
                        <Card.Title>{propiedad.title}</Card.Title>
                      </Col>
                      <Col className="col-grid" sm={6}>
                        <Form.Text className="text-muted">
                          $ {propiedad.price}
                        </Form.Text>
                      </Col>
                      <Col className="col-grid" sm={6}>
                        <Form.Text className="text-muted">
                          <SlLocationPin /> {propiedad.city}
                        </Form.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-grid" sm={4}>
                        <Form.Text className="text-muted">
                          <RxRulerSquare /> {propiedad.area} m2
                        </Form.Text>
                      </Col>

                      <Col className="col-grid" sm={4}>
                        <Form.Text className="text-muted">
                          <BiBed /> {propiedad.bedroom} Dorm.
                        </Form.Text>
                      </Col>
                      <Col className="col-grid" sm={4}>
                        <Form.Text className="text-muted">
                          <BiBath className="botones-info" />{" "}
                          {propiedad.bathroom} Baños
                        </Form.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-grid" sm={12}>
                        <Form.Text className="text-muted">
                          {propiedad.description.length > 250
                            ? `${propiedad.description.substring(0, 250)}...`
                            : propiedad.description}
                        </Form.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Body className="botones-div">
                    <Button className="botones-cta">
                      <MdFavoriteBorder className="boton-cta" />
                    </Button>
                    <Button className="botones-cta">
                      <BiPhoneCall className="boton-cta" />
                    </Button>
                    <Link to={`/property/${propiedad.id}`}>
                      <Button className="buttonVerMas">VER MÁS</Button>
                    </Link>
                  </Card.Body>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};
