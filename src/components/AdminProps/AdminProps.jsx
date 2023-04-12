import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./AdminProps.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiBed, BiBath } from "react-icons/bi";
import { RxRulerSquare } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";

export const AdminProps = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/property")
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [properties]);

  const handleDelete = (id) => {
    axios
      .delete(`/api/property/delete/${id}`, { withCredentials: true })
      .then((res) => {
        console.log("ENTRE AL THEN", res);
      });
  };

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
        <Link to="/agregar">
          <Button className="buttonEditar">
            <FiEdit className="boton-cta" /> AGREGAR PROPIEDADES
          </Button>
        </Link>
      </div>
      <Container className="cont-grid">
        <Row className="row-grid">
          {properties.map((propiedad) => {
            return (
              <Col
                key={propiedad.id}
                className="col-grid col-md-offset-2"
                sm={6}
              >
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
                  <Link to={`/edit/${propiedad.id}`}>
                    <Button className="buttonEditar">
                      <FiEdit className="boton-cta" /> EDITAR
                    </Button>
                  </Link>

                  <Button
                    className="buttonEditar"
                    onClick={() => {
                      handleDelete(propiedad.id);
                    }}
                  >
                    <FiTrash2 className="boton-cta" /> ELIMINAR
                  </Button>
                </Card.Body>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
