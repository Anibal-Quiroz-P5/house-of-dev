import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Grid.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiBed, BiBath, BiPhoneCall } from "react-icons/bi";
import { RxRulerSquare } from "react-icons/rx";
import { MdFavoriteBorder } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

export const Grid = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("/api/property/")
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
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
                        <BiBath className="botones-info" /> {propiedad.bathroom}{" "}
                        Baños
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
  );
};
