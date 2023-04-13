import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Card, Form, Container } from "react-bootstrap";
import { BiBed, BiBath, BiPhoneCall } from "react-icons/bi";
import { RxRulerSquare } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../../state/user";
import { BiDollar } from "react-icons/bi";

export const Favoritos = () => {
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

      <Container>
        <Row>
          {favourites.map((propiedades) => {
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
                        <BiDollar className="icons-internos" />{" "}
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
                            ? `${propiedades.description.substring(0, 180)}...`
                            : propiedades.description}
                        </Form.Text>
                      </Col>
                    </Row>
                    <Container className="cont-btn">
                      <Row>
                        <Col className="col-internas-botones">
                          <Button className="btn-cta">
                            <BiPhoneCall />
                          </Button>
                        </Col>
                        <Col className="col-internas-botones">
                          <Button
                            className="btn-mas"
                            onClick={() => {
                              handleDeleteFav(propiedades.id);
                            }}
                          >
                            ELIMINAR
                          </Button>
                        </Col>
                        <Col className="col-internas-botones">
                          <Link to={`/property/${propiedades.id}`}>
                            <Button className="btn-mas">VER MÁS</Button>
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
