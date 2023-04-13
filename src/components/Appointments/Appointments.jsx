import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Card, Form, Container } from "react-bootstrap";
import { BiPhoneCall } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { VscAccount, VscWatch, VscCalendar, VscMail } from "react-icons/vsc";
export const Appointments = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/appointment/appointments")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.log(error));
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
            PROXIMAS CITAS : ({users.length})
          </Col>
        </Row>
      </div>

      <Container className="cont-grid">
        <Row className="row-grid">
          {users.map((propiedad) => {
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
                      src={propiedad.property.image[0]}
                    ></Card.Img>
                  </Col>
                  <Col className="col-siete" xs={7}>
                    <Row>
                      <Col className="col-internas" sm={6}>
                        <VscCalendar className="icons-internos" />
                        {propiedad.date}
                      </Col>
                      <Col className="col-internas" sm={6}>
                        <VscWatch className="icons-internos" />
                        {propiedad.time}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-internas" sm={12}>
                        <SlLocationPin className="icons-internos" />{" "}
                        {propiedad.property.address}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-internas" sm={12}>
                        <VscAccount className="icons-internos" />
                        {`${propiedad.user.first_name} ${propiedad.user.last_name}`}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-internas" sm={12}>
                        <BiPhoneCall className="icons-internos" />
                        {propiedad.user.phone}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-internas" sm={12}>
                        <VscMail className="icons-internos" />
                        {propiedad.user.email}
                      </Col>
                    </Row>
                    <Container className="cont-btn">
                      <Row>
                        <Col className="col-internas-botones">
                          <Button className="btn-cta">
                            <BiPhoneCall />
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
  );
};
