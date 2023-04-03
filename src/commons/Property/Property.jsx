import React, { useEffect, useState } from "react";
import { Card, Container, Form, ListGroup, Button } from "react-bootstrap";
import "./Property.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const Property = () => {
  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userLogueado);
  }, []);

  useEffect(() => {
    axios
      .get(`/api/property/${id}`)
      .then((res) => {
        console.log(res.data);
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <Container className="prop-container">
        <Card>
          <Card.Body>
            <Card.Title className="centerItem">{properties.title}</Card.Title>
            <Card.Text>{properties.description}</Card.Text>
          </Card.Body>
        </Card>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <Form.Text className="text-muted">
              Tipo: {properties.type} | Condición: {properties.condition}{" "}
            </Form.Text>
            <br /> USD {properties.price}
          </ListGroup.Item>
          <ListGroup.Item>
            {properties.bedroom} Dormitorios | {properties.bathroom} Baños |{" "}
            {properties.area} m2
          </ListGroup.Item>
          <ListGroup.Item>
            {properties.address}. {properties.city}, {properties.state},{" "}
            {properties.country}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Body>
            {user.first_name ? (
              <>
                <Button className="buttonStyle" type="submit">
                  Favorito
                </Button>
                <Link to={`/properties/change/${id}`}>
                  <Button className="buttonStyle">Agendar visita</Button>
                </Link>
              </>
            ) : null}
          </Card.Body>
          {user.is_admin ? (
            <>
              <Link to={`/properties/change/${id}`}>
                <Button className="buttonStyle">Editar Propiedad</Button>
              </Link>
              <Link to={`/properties/delete/${id}`}>
                <Button className="buttonStyle">Eliminar Propiedad</Button>
              </Link>
            </>
          ) : null}
        </Card.Body>
      </Container>
    </>
  );
};

{
  /// diseño parecido bs
  /* <div className="container-card">
        <div className="row fila-card">
          <div className="col-12 columna1-card">
            <div className="banner-inicio">
              <img
                src="https://images.pexels.com/photos/7512042/pexels-photo-7512042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                class="mx-auto d-block"
                alt="Responsive image"
                style={{ marginTop: "5%", marginBottom: "2%" }}
                height={"450px"}
                width={"80%"}
              ></img>
            </div>
          </div>
          <div className="col-12 columna-card">
            <div className="row fila-card">
              <div className="col columna-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-currency-dollar"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                </svg>{" "}
                Precio
              </div>
              <div className="col columna-card">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                Ubicacion
              </div>
            </div>
            <div className="row fila-card">
              <div className="col columna-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-rulers"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1H1z" />
                </svg>
                {propiedadUno.title}
              </div>
              <div className="col columna-card"> Habitaciones</div>
              <div className="col columna-card">{propiedadUno.country}</div>
            </div>
            <div className="row fila-card">
              <div className="col columna-card">
                Lorem ipsum dolor amet, consectetur adipiscing elit.
              </div>
            </div>
            <div className="row fila-card">
              <div className="col columna-card">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-outline-primary" type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </button>
                  <button class="btn btn-outline-primary" type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-telephone-forward"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm10.762.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
