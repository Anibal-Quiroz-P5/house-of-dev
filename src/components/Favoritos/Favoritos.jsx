import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Card, Form, Container } from "react-bootstrap";
import { BiBed, BiBath, BiPhoneCall } from "react-icons/bi";
import { RxRulerSquare } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavs, setUser } from "../../state/user";
import { BiDollar } from "react-icons/bi";

export const Favoritos = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLogueado);
  }, []);

  // traigo todos los fav un usuario

  useEffect(() => {
    axios
      .get(`/api/favourites/${user.id}/favourites`)
      .then((res) => {
        setFavourites(res.data.properties);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  //deleteo por id de usuario y id de propiedad

  const handleDeleteFav = (id) => {
    axios
      .delete(`/api/favourites/${user.id}/delete/${id}`)
      .then((res) => {
        {
          const nuevosFavoritos = favourites.filter(
            (favorito) => favorito.id !== id
          );
          setFavourites(nuevosFavoritos);
        }
      })
      .catch((error) => console.log(error));
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
            MIS FAVORITOS - TOTAL : ({favourites.length})
          </Col>
        </Row>
      </div>

      <Container className="cont-grid">
        <Row className="row-grid">
          {favourites.map((propiedad) => {
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
                      src={propiedad.image[0]}
                    ></Card.Img>
                  </Col>
                  <Col className="col-siete" xs={7}>
                    <Row>
                      <Col className="col-internas" sm={6}>
                        <BiDollar className="icons-internos" />{" "}
                        {propiedad.price}
                      </Col>
                      <Col className="col-internas" sm={6}>
                        <SlLocationPin className="icons-internos" />{" "}
                        {propiedad.city}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-internas" sm={4}>
                        <RxRulerSquare className="icons-internos" />{" "}
                        {propiedad.area} m2
                      </Col>
                      <Col className="col-internas" sm={4}>
                        <BiBed className="icons-internos" /> {propiedad.bedroom}
                      </Col>
                      <Col className="col-internas" sm={4}>
                        <BiBath className="icons-internos" />{" "}
                        {propiedad.bathroom}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-internas">
                        <Form.Text>
                          {propiedad.description.length > 180
                            ? `${propiedad.description.substring(0, 180)}...`
                            : propiedad.description}
                        </Form.Text>
                      </Col>
                    </Row>
                    <Container className="cont-btn">
                      <Row>
                        <Col className="col-internas-botones">
                          <Button className="btn-cta">
                            <BiPhoneCall />
                          </Button>

                          <Button
                            className="btn-mas"
                            onClick={() => handleDeleteFav(propiedad.id)}
                          >
                            ELIMINAR
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Col>
              // <Col className="col-grid col-md-offset-2" sm={6}>
              //   <Card.Body>
              //     <Row>
              //       <Col className="col-grid" sm={12}>
              //         <Card.Title>{favourites.title}</Card.Title>
              //       </Col>
              //       <Col className="col-grid" sm={6}>
              //         <Form.Text className="text-muted">
              //           $ {propiedad.price}
              //         </Form.Text>
              //       </Col>
              //       <Col className="col-grid" sm={6}>
              //         <Form.Text className="text-muted">
              //           <SlLocationPin /> {propiedad.city}
              //         </Form.Text>
              //       </Col>
              //     </Row>
              //     <Row>
              //       <Col className="col-grid" sm={4}>
              //         <Form.Text className="text-muted">
              //           <RxRulerSquare /> {propiedad.area} m2
              //         </Form.Text>
              //       </Col>

              //       <Col className="col-grid" sm={4}>
              //         <Form.Text className="text-muted">
              //           <BiBed /> {propiedad.bedroom} Dorm.
              //         </Form.Text>
              //       </Col>
              //       <Col className="col-grid" sm={4}>
              //         <Form.Text className="text-muted">
              //           <BiBath className="botones-info" /> {propiedad.bathroom}{" "}
              //           Baños
              //         </Form.Text>
              //       </Col>
              //     </Row>
              //     <Row>
              //       <Col className="col-grid" sm={12}>
              //         <Form.Text className="text-muted">
              //           {propiedad.description.length > 250
              //             ? `${propiedad.description.substring(0, 250)}...`
              //             : propiedad.description}
              //         </Form.Text>
              //       </Col>
              //     </Row>
              //   </Card.Body>
              //   <Card.Body className="botones-div">
              //     <Button className="btn-cta">
              //       <BiPhoneCall className="boton-cta" />
              //     </Button>
              //     <Button
              //       className="btn-mas"
              //       onClick={() => handleDeleteFav(propiedad.id)}
              //     >
              //       ELIMINAR
              //     </Button>
              //   </Card.Body>
              // </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
