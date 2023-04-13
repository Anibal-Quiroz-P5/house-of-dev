import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Grid.css";
import { useState, useEffect } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiBed, BiBath, BiPhoneCall } from "react-icons/bi";
import { RxRulerSquare } from "react-icons/rx";
import { MdFavoriteBorder } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { useSelector } from "react-redux";

export const Grid = () => {
  const user = useSelector((state) => state.user);
  const addToFavoriteHandler = 0;
  const navigate = useNavigate();

  const properties = [
    {
      title:
        "Hermoso departamento en alquiler, muy buena ubicación, a metros del centro de la ciudad.",
      address: "Angel Justiniano Carranza 2300",
      city: "Palermo",
      state: "Buenos Aires",
      country: "Argentina",
      description:
        "Es un 2 ambientes y medio.\nEn PB tenemos hall de entrada con mueble de almacenamiento, toilette, una gran cocina toda eléctrica con isla con espacio de guardado, espacio para lavarropas y lavavajillas, mesadas de granito azul labrador. Continúa con espacio de living y balcón con iluminación propia. Tiene cortinas black out y aire frio calor en ambas plantas.\nAccedemos a planta alta por una escalera espaciosa con baranda, ventilación cruzada en ambos pisos, baño completo con bañera y mampara de vidrio, mueble de guardado espacioso, un espacio libre frente al placard para oficina, placard inmenso de 3 cuerpos con iluminación propia, espacio de dormitorio con mueble para la cama con cajones de guardado y ventanales corredizos.\nAire frio calor también en planta alta.\nCochera descubierta.\nA una cuadra de Av Santa Fe, conexión inmediata con Metrobús, línea D de subterráneo y tren. \nEl edificio cuenta con laundry con lavarropas industrial (buenísimo para acolchados) y sum equipado para 12 personas con parrilla tipo chulengo.",
      price: 120000,
      image: [
        "https://imgar.zonapropcdn.com/avisos/1/00/51/25/94/56/1200x1200/1857482570.jpg",
        "https://imgar.zonapropcdn.com/avisos/1/00/51/25/94/56/1200x1200/1857482576.jpg",
        "https://imgar.zonapropcdn.com/avisos/1/00/51/25/94/56/1200x1200/1857482577.jpg",
        "https://imgar.zonapropcdn.com/avisos/1/00/51/25/94/56/1200x1200/1857482572.jpg",
        "https://imgar.zonapropcdn.com/avisos/1/00/51/25/94/56/1200x1200/1857482571.jpg",
      ],
      rooms: 2,
      area: 63,
      bedroom: 2,
      bathroom: 1,
      condition: "alquiler",
      ranking: [],
      type: "departamento",
      review: [],
    },
    {
      title: "Departamento con vista al Dique",
      address: "Olga Cosentini 1300",
      city: "Puerto Madero",
      state: "Buenos Aires",
      country: "Argentina",
      description:
        "Palier privado, placard de recepción y toilettes de visita.\nLiving comedor con salida a balcón corrido con vista directa al dique.Cocina con comedor diario, salida a balcón, entrada de servicio.\nPisos de madera en recepción y dormitorios.\nDormitorio principal en suite, con hidro y vestidor, además de salida a balcón corrido al dique.2 dormitorios con placard que comparten un baño con box de ducha.\nAires acondicionados en los dormitorios.\nLosa radiante en los baños.1 cochera. ",
      price: 180000,
      image: [
        "https://imgar.zonapropcdn.com/avisos/resize/1/00/32/35/79/04/1200x1200/1625194380.jpg",
        "https://imgar.zonapropcdn.com/avisos/resize/1/00/32/35/79/04/1200x1200/1625194379.jpg",
        "https://imgar.zonapropcdn.com/avisos/resize/1/00/32/35/79/04/1200x1200/1625194378.jpg",
        "https://imgar.zonapropcdn.com/avisos/resize/1/00/32/35/79/04/1200x1200/1625194381.jpg",
      ],
      rooms: 4,
      area: 139,
      bedroom: 3,
      bathroom: 2,
      condition: "alquiler",
      ranking: [],
      type: "departamento",
      review: [],
    },
    {
      title:
        "Hermoso departamento en alquiler, muy buena ubicación, a metros del centro de la ciudad.",
      address: "Angel Justiniano Carranza 2300",
      city: "Palermo",
      state: "Buenos Aires",
      country: "Argentina",
      description:
        "Es un 2 ambientes y medio.\nEn PB tenemos hall de entrada con mueble de almacenamiento, toilette, una gran cocina toda eléctrica con isla con espacio de guardado, espacio para lavarropas y lavavajillas, mesadas de granito azul labrador. Continúa con espacio de living y balcón con iluminación propia. Tiene cortinas black out y aire frio calor en ambas plantas.\nAccedemos a planta alta por una escalera espaciosa con baranda, ventilación cruzada en ambos pisos, baño completo con bañera y mampara de vidrio, mueble de guardado espacioso, un espacio libre frente al placard para oficina, placard inmenso de 3 cuerpos con iluminación propia, espacio de dormitorio con mueble para la cama con cajones de guardado y ventanales corredizos.\nAire frio calor también en planta alta.\nCochera descubierta.\nA una cuadra de Av Santa Fe, conexión inmediata con Metrobús, línea D de subterráneo y tren. \nEl edificio cuenta con laundry con lavarropas industrial (buenísimo para acolchados) y sum equipado para 12 personas con parrilla tipo chulengo.",
      price: 120000,
      image: [
        "https://imgar.zonapropcdn.com/avisos/1/00/51/25/94/56/1200x1200/1857482570.jpg",
        "https://imgar.zonapropcdn.com/avisos/1/00/51/25/94/56/1200x1200/1857482576.jpg",
        "https://imgar.zonapropcdn.com/avisos/1/00/51/25/94/56/1200x1200/1857482577.jpg",
        "https://imgar.zonapropcdn.com/avisos/1/00/51/25/94/56/1200x1200/1857482572.jpg",
        "https://imgar.zonapropcdn.com/avisos/1/00/51/25/94/56/1200x1200/1857482571.jpg",
      ],
      rooms: 2,
      area: 63,
      bedroom: 2,
      bathroom: 1,
      condition: "alquiler",
      ranking: [],
      type: "departamento",
      review: [],
    },
  ];

  return (
    <section>
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
                          <Button className="btn-cta">
                            <BiPhoneCall />
                          </Button>
                        </Col>
                        <Col className="col-internas-botones">
                          <Button className="btn-cta">
                            <MdFavoriteBorder />
                          </Button>
                        </Col>
                        <Col className="col-internas-botones">
                          <Button className="btn-mas">Ver mas</Button>
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
