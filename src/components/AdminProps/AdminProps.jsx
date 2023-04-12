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
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export const AdminProps = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.user);

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
    if (id) {
      Swal.fire({
        title: "Alerta",
        text: "¿Seguro quieres eliminar esta propiedad?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: "No",
        confirmButtonColor: "#123AC8",
      }).then((response) => {
        if (response.isConfirmed) {
          axios
            .delete(`/api/property/delete/${id}`, { withCredentials: true })
            .then((res) => {
              Swal.fire({
                title: "Alerta",
                text: "Propiedad eliminada",
                icon: "success",
                confirmButtonText: "ok",
                timer: "2000",
              });
            });
        } else {
          Swal.fire({
            title: "Alerta",
            icon: "error",
            html: "La propiedad no fue eliminada",
            timer: "2000",
          });
        }
      });
    }
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
              <Col xs={12} md={6} lg={6} style={{ padding: "1.5%" }}>
                <Card
                  id={propiedad.id}
                  style={{
                    height: "250px",
                    border: "1px solid #123AC8",
                    borderRadius: "0px",
                    margin: "0 auto",
                    width: "95%",
                  }}
                >
                  <Row>
                    <Col xs={5}>
                      <Card.Img
                        style={{
                          height: "250px",
                          borderRight: "1px solid #123AC8",
                          marginLeft: "5%",
                          borderRadius: "0%",
                        }}
                        src={propiedad.image[0]}
                      />
                    </Col>
                    <Col xs={7} style={{ width: "51%", margin: "0 auto" }}>
                      <Row>
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
                            {propiedad.description}
                          </Form.Text>
                        </Col>
                      </Row>
                      <Card.Body className="botones-div">
                        <Button
                          className="buttonEditar"
                          onClick={() => {
                            handleDelete(propiedad.id);
                          }}
                        >
                          <FiTrash2 className="boton-cta" /> ELIMINAR
                        </Button>
                        <Link to={`/edit/${propiedad.id}`}>
                          <Button className="buttonEditar">
                            <FiEdit className="boton-cta" /> EDITAR
                          </Button>
                        </Link>
                      </Card.Body>{" "}
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
