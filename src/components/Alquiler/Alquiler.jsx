import React from "react";
import "./Alquiler.css";
import { Grid } from "../../commons/Grid/Grid";
import {
  Accordion,
  Button,
  Col,
  Row,
  Form,
  Container,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BiBed, BiBath, BiPhoneCall } from "react-icons/bi";
import { RxRulerSquare } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { addToFavs, setUser } from "../../state/user";
import Swal from "sweetalert2";

export const Alquiler = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [tipoDePropiedad, setTipoDePropiedad] = useState("");

  /// Propiedades ///
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("/api/property/condition/alquiler")
      .then((res) => {
        setProperties(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /// Filtros por Tipo ///
  const handleChange = (e) => {
    setTipoDePropiedad(e.target.value);
  };

  const handleFilterTipoDeProps = (e) => {
    e.preventDefault();
    axios
      .get(`/api/property/type/${tipoDePropiedad}/`)
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ///

  /// Filtros por Precio ///

  const handleFilterPrecioMenorAMayor = (e) => {
    const sorted = [...properties].sort((a, b) => {
      return a.price - b.price;
    });
    e.preventDefault();
    axios
      .get(`/api/property/condition/alquiler`)
      .then((res) => {
        setProperties(sorted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterPrecioMayorAMenor = (e) => {
    const sorted = [...properties].sort((a, b) => {
      return b.price - a.price;
    });
    e.preventDefault();
    axios
      .get(`/api/property/condition/alquiler`)
      .then((res) => {
        setProperties(sorted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /// SEARCH

  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    axios
      .get(`/api/property/buscar/${query}`)
      .then((response) => {
        console.log("Respuesta de búsqueda:", response.data);
        setProperties(response.data);
      })
      .catch((error) => {
        console.log("Error al realizar la búsqueda:", error);
      });
    console.log("Realizando búsqueda con la query:", query);
  };

  //añadir a favoritos // no funciona
  const handleAddFavorites = (id) => {
    axios
      .post(
        `/api/favourites/${user.id}/add/${id}`,
        { id: properties.id, user },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("agregado correctamente", res.data);
        Swal.fire({
          title: "Agregado a favoritos",
          icon: "success",
          timer: "1000",
        });
        dispatch(addToFavs(res.data));
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
              padding: "10px",
              color: "#123acb",
              fontFamily: "Montserrat",
              fontWeight: "900",
            }}
          >
            PROPIEDADES EN ALQUILER
          </Col>
        </Row>
      </div>
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        {user.first_name ? (
          <Link to={"/favoritos"}>
            <Button className="buttonFav">
              {" "}
              Favoritos
              <MdFavoriteBorder className="fav" />
            </Button>
          </Link>
        ) : null}
      </div>

      <div className="baner">
        <div
          style={{
            width: "45%",
            marginLeft: "55%",
            height: "100%",
            paddingTop: "15%",
            paddingRight: "3%",
            background: "linear-gradient(to right, transparent, #123AC8",
            color: "white",
          }}
        >
          <h1 className="h1-grid">Lorem ipsum dolor</h1>
          <h1 className="h1-grid">amet consectetur adipisicing elit.</h1>
        </div>
      </div>
      <Container style={{ marginTop: "2%", marginBottom: "2%" }}>
        <Row className="row-filter">
          <Col sm={3}>
            <Accordion
              className="acordion"
              style={{
                border: "2px solid #123acb",
                fontFamily: "Montserrat",
                fontWeight: "900",
              }}
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Filtrar por precio</Accordion.Header>
                <Accordion.Body>
                  <Button
                    variant="primary"
                    href="/alquiler"
                    onClick={handleFilterPrecioMenorAMayor}
                    style={{
                      border: "1px solid #123acb",
                      borderRadius: "0px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      padding: "5px",
                      backgroundColor: "white",
                      margin: "2%",
                      color: "black",
                    }}
                  >
                    Precio Menor a Mayor{" "}
                  </Button>
                  <Button
                    variant="primary"
                    href="/alquiler"
                    onClick={handleFilterPrecioMayorAMenor}
                    style={{
                      border: "1px solid #123acb",
                      borderRadius: "0px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      padding: "5px",
                      backgroundColor: "white",
                      margin: "2%",
                      color: "black",
                    }}
                  >
                    Precio Mayor a Menor{" "}
                  </Button>
                  <Button
                    variant="primary"
                    href="/alquiler"
                    style={{
                      border: "1px solid #123acb",
                      borderRadius: "0px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      padding: "5px",
                      backgroundColor: "white",
                      margin: "2%",
                      color: "black",
                    }}
                  >
                    Borrar Filtro
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col sm={3}>
            <Accordion
              className="acordion"
              style={{
                border: "2px solid #123acb",
                fontFamily: "Montserrat",
                fontWeight: "900",
              }}
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Tipo de propiedad</Accordion.Header>
                <Accordion.Body>
                  <div class="form-check form-switch">
                    <input
                      onChange={handleChange}
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      value="casa"
                      checked={tipoDePropiedad == "casa" ? true : false}
                    ></input>
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Casa
                    </label>
                  </div>
                  <div class="form-check form-switch">
                    <input
                      onChange={handleChange}
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      value="departamento"
                      checked={tipoDePropiedad == "departamento" ? true : false}
                    ></input>
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckChecked"
                    >
                      Departamento
                    </label>
                  </div>
                  <div class="form-check form-switch">
                    <input
                      onChange={handleChange}
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDisabled"
                      value="duplex"
                      checked={tipoDePropiedad == "duplex" ? true : false}
                    ></input>
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDisabled"
                    >
                      Duplex
                    </label>
                  </div>
                  <div class="form-check form-switch">
                    <input
                      onChange={handleChange}
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDisabled"
                      value="ph"
                      checked={tipoDePropiedad == "ph" ? true : false}
                    ></input>
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDisabled"
                    >
                      PH
                    </label>
                  </div>
                  <div class="form-check form-switch">
                    <input
                      onChange={handleChange}
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDisabled"
                      value="terreno"
                      checked={tipoDePropiedad == "terreno" ? true : false}
                    ></input>
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDisabled"
                    >
                      Terreno
                    </label>
                  </div>
                  <Button
                    variant="primary"
                    onClick={handleFilterTipoDeProps}
                    style={{
                      border: "1px solid #123acb",
                      borderRadius: "0px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      padding: "5px",
                      backgroundColor: "white",
                      margin: "2%",
                      color: "black",
                    }}
                  >
                    Filtrar
                  </Button>
                  <Button
                    variant="primary"
                    href="/alquiler"
                    style={{
                      border: "1px solid #123acb",
                      borderRadius: "0px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      padding: "5px",
                      backgroundColor: "white",
                      margin: "2%",
                      color: "black",
                    }}
                  >
                    Borrar Filtro
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col sm={6}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Busca tu propiedad"
                className="me-2"
                aria-label="Search"
                value={query}
                onChange={handleInputChange}
                style={{
                  border: "2px solid #123acb",
                  borderRadius: "0px",
                  fontFamily: "Montserrat",
                  fontWeight: "900",
                  padding: "15px",
                }}
              />
              <Button
                onClick={handleSearch}
                style={{
                  border: "2px solid #123acb",
                  borderRadius: "0px",
                  fontFamily: "Montserrat",
                  fontWeight: "900",
                  padding: "15px",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                Buscar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <hr className="hr-separador" />
      {/* ///Grilla/// */}
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
                              <BiPhoneCall />
                            </Button>
                          </Col>
                          <Col className="col-internas-botones">
                            <Button
                              className="btn-cta"
                              onClick={() => {
                                handleAddFavorites(propiedades.id);
                              }}
                            >
                              <MdFavoriteBorder />
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
    </>
  );
};

{
  /* <Container className="cont-grid">
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
                    {propiedad.description.length > 220
                      ? `${propiedad.description.substring(
                          0,
                          220
                        )}...`
                      : propiedad.description}
                  </Form.Text>
                </Col>
              </Row>

              <Card.Body className="botones-div">
                {/* <Button
            className="botones-cta"
            type="submit"
            onClick={() => handleAddFavorites(properties.id)}
          >
            <MdFavoriteBorder className="boton-cta" />
          </Button> */
}
//                 <Button className="botones-cta">
//                   <BiPhoneCall className="boton-cta" />
//                 </Button>
//                 <Link to={`/property/${propiedad.id}`}>
//                   <Button className="buttonVerMas">VER MÁS</Button>
//                 </Link>
//               </Card.Body>
//             </Col>
//           </Row>
//         </Card>
//       </Col>
//     );
//   })}
// </Row>
// </Container> */}
