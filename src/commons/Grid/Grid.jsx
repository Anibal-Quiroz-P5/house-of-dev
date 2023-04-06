import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Grid.css";
import { useState, useEffect } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiBed, BiBath, BiPhoneCall } from "react-icons/bi";
import { RxRulerSquare } from "react-icons/rx";
import { MdFavoriteBorder } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

export const Grid = () => {
  return (
    <section>
      <Container style={{ width: "100%", color: "#123AC8" }}>
        <Row className="row-grid">
          <Col xs={12} md={6} lg={6} style={{ padding: "1.6%" }}>
            <Card
              style={{
                height: "110%",
                border: "1px solid #123AC8",
                borderRadius: "0px",
                marginLeft: "15%",
              }}
            >
              <Row className="row-grid">
                <Col xs={5}>
                  <Card.Img
                    style={{
                      height: "110%",
                      borderRight: "1px solid #123AC8",
                      padding: "2%",
                      marginLeft: "5%",
                      borderRadius: "0%",
                    }}
                  />
                </Col>
                <Col xs={7}>
                  <Card.Body
                    style={{
                      padding: "0%",

                      height: "110%",
                    }}
                  >
                    <div style={{ width: "100%", display: "flex" }}>
                      <div
                        style={{
                          width: "40%",
                          padding: "3%",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "12px",
                          border: "1px solid #123AC8",
                        }}
                      >
                        Precio
                      </div>
                      <div
                        style={{
                          width: "60%",
                          fontSize: "11px",
                          padding: "3%",
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #123AC8",
                        }}
                      >
                        Ubicacion
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          width: "34%",
                          padding: "3%",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "13px",
                          border: "1px solid #123AC8",
                        }}
                      >
                        Area
                      </div>
                      <div
                        style={{
                          width: "33%",
                          padding: "2%",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "13px",
                          border: "1px solid #123AC8",
                        }}
                      >
                        Bedrrom
                      </div>

                      <div
                        style={{
                          width: "33%",
                          padding: "2%",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "13px",
                          border: "1px solid #123AC8",
                        }}
                      >
                        Baños
                      </div>
                    </div>
                    <Card.Text
                      style={{
                        padding: "5%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Descrip
                    </Card.Text>
                    <div
                      style={{
                        borderTop: "1px solid #123AC8",
                        height: "25%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginLeft: "30%" }}></div>
                      <div style={{ marginLeft: "8%" }}></div>

                      <button>Ver más</button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
