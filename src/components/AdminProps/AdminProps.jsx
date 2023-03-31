import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./AdminProps.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiBed, BiBath } from "react-icons/bi";
import { RxRulerSquare } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export const AdminProps = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("/api/property")
      .then((res) => {
        console.log(res.data);
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section>
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
              marginBottom: "3%",
              padding: "10px",
              color: "#123acb",
              fontFamily: "Montserrat",
              fontWeight: "900",
            }}
          >
            PANEL DE PROPIEDADES
          </Col>
        </Row>
      </div>
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
                        <BiBath className="botones-info" /> {propiedad.bathroom}{" "}
                        Baños
                      </Form.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-grid" sm={12}>
                      <Form.Text className="text-muted">
                        {propiedad.description}
                      </Form.Text>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Body className="botones-div">
                  {/* <Button className="botones-cta">
                    <MdFavoriteBorder className="boton-cta" />
                  </Button>
                  <Button className="botones-cta">
                    <BiPhoneCall className="boton-cta" />
                  </Button> */}
                  <Link to={`/properties/${propiedad.id}`}>
                    <Button className="buttonEditar">
                      <FiEdit className="boton-cta" /> EDITAR
                    </Button>
                  </Link>
                  <Link to={"/propiedades"}>
                    <Button className="buttonEditar">
                      <FiTrash2 className="boton-cta" /> ELIMINAR
                    </Button>
                  </Link>
                </Card.Body>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};