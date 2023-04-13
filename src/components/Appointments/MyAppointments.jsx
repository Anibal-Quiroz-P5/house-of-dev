import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Card, Form, Container } from "react-bootstrap";
import { BiBed, BiBath, BiPhoneCall } from "react-icons/bi";
import { VscWatch, VscCalendar } from "react-icons/vsc";
import { RxRulerSquare } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";
import { useSelector } from "react-redux";
import { setUser } from "../../state/user";
import { BiDollar } from "react-icons/bi";
export const MyAppointments = () => {
  const user = useSelector((state) => state.user);
  const [myAppointments, setMyAppointments] = useState([]);
  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLogueado);
  }, []);

  useEffect(() => {
    axios
      .get(`/api/appointment/${user.id}/appointments`)
      .then((res) => {
        console.log("soy res data", res.data.properties[0].appointment);
        setMyAppointments(res.data.properties);
      })
      .catch((err) => {
        console.log("el error");
      });
  }, [user]);
  console.log("mis citas", myAppointments.appointment);
  //deleteo por id de usuario y id de propiedad

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`/api/appointment/${user.id}/delete/${id}`)
      .then((res) => {
        {
          const newAppointments = myAppointments.filter(
            (appointment) => appointment.id !== id
          );
          setMyAppointments(newAppointments);
        }
      })
      .catch((error) => console.log(error));
  };

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
              marginBottom: "3%",
              padding: "10px",
              color: "#123acb",
              fontFamily: "Montserrat",
              fontWeight: "900",
            }}
          >
            MIS CITAS : ({myAppointments.length})
          </Col>
        </Row>
      </div>
      <hr className="hr-separador" />
      {/* ///Grilla/// */}
      <section>
        <Container>
          <Row>
            {myAppointments.map((propiedades) => {
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
                          <VscCalendar className="icons-internos" />
                          {propiedades.appointment.date}
                        </Col>
                        <Col className="col-internas" sm={6}>
                          <VscWatch className="icons-internos" />
                          {propiedades.appointment.time}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="col-internas" sm={6}>
                          <BiDollar className="icons-internos" />
                          {propiedades.price}
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
                              ? `${propiedades.description.substring(
                                  0,
                                  180
                                )}...`
                              : propiedades.description}
                          </Form.Text>
                        </Col>
                      </Row>

                      <Container className="cont-btn">
                        <Row>
                          <Col className="col-internas-botones">
                            <Button className="btn-cta">
                              <BiPhoneCall className="boton-cta" />
                            </Button>
                            <Button
                              className="btn-mas"
                              onClick={() =>
                                handleDeleteAppointment(propiedades.id)
                              }
                            >
                              ELIMINAR
                            </Button>
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
    </>
  );
};
