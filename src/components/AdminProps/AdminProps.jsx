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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Link to="/agregar">
            <Button className="button-agregar">
              <FiEdit className="boton-cta" /> AGREGAR PROPIEDADES
            </Button>
          </Link>
        </div>
      </div>
      <Container>
        <Row>
          {properties.map((propiedades) => {
            return (
              <Col
                className="col-principal"
                xs={12}
                md={6}
                lg={6}
                style={{ padding: "1.5%" }}
              >
                <Row>
                  <Col className="col-cinco" xs={5}>
                    <Card.Img
                      className="grid-img"
                      src={propiedades.image[0]}
                    ></Card.Img>
                  </Col>
                  <Col className="col-siete" xs={7}>
                    <Row>
                      <Col className="col-internas" sm={6}>
                        $ {propiedades.price}
                      </Col>
                      <Col className="col-internas" sm={6}>
                        <SlLocationPin className="icons-internos" />{" "}
                        {propiedades.city}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-internas" sm={4}>
                        <RxRulerSquare className="icons-internos" />{" "}
                        {propiedades.area} m2
                      </Col>
                      <Col className="col-internas" sm={4}>
                        <BiBed className="icons-internos" />{" "}
                        {propiedades.bedroom}
                      </Col>
                      <Col className="col-internas" sm={4}>
                        <BiBath className="icons-internos" />{" "}
                        {propiedades.bathroom}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-internas">
                        <Form.Text>
                          {propiedades.description.length > 180
                            ? `${propiedades.description.substring(0, 180)}...`
                            : propiedades.description}
                        </Form.Text>
                      </Col>
                    </Row>
                    <Container className="cont-btn">
                      <Row>
                        <Col className="col-internas-botones">
                          <Button
                            className="btn-mas"
                            onClick={() => {
                              handleDelete(propiedades.id);
                            }}
                          >
                            <FiTrash2 className="boton-cta" /> ELIMINAR
                          </Button>
                        </Col>
                        <Col className="col-internas-botones">
                          <Link to={`/edit/${propiedades.id}`}>
                            <Button className="btn-mas">
                              <FiEdit className="boton-cta" /> EDITAR
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

{
  /* <Card.Body className="botones-div">
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
</Card.Body>{" "} */
}
