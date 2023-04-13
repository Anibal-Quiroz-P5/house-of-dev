import React, { useEffect, useState } from "react";
import { Card, Container, Form, ListGroup, Button } from "react-bootstrap";
import "./Property.css";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useDispatch, useSelector } from "react-redux";
import { addToFavs, setUser } from "../../state/user";
import { Rating } from "react-simple-star-rating";
import { Carousel } from "react-bootstrap";
import Swal from "sweetalert2";

export const Property = () => {
  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isScheduling, setIsScheduling] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [value, onChange] = useState("10:00"); //  BORRARRRR

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

  const handleAddFavorites = (id) => {
    axios
      .post(`/api/favourites/${user.id}/add/${id}`)
      .then((res) => {
        dispatch(addToFavs(res.data));
      })
      .catch((error) => console.log(error));
  };

  const handleAgendar = (id) => {
    //const formattedDate = selectedDate.toISOString().slice(0, 10);
    const selectedDateMoment = moment(selectedDate);
    const hoy = moment();
    const formattedDate = selectedDateMoment.format("YYYY-MM-DD");
    const hora = selectedTime.split(":")[0];
    const dia = selectedDate.getDay();
    const data = { date: formattedDate, time: selectedTime };
    //validacion de horario
    if (hora < 7 || hora >= 19) {
      Swal.fire({
        title: "El horario de citas es de 07:00 am a 19:00 pm",
        icon: "error",
        timer: "3000",
      });
      return;
    }
    //validar dias de semana
    if (dia === 0 || dia === 6) {
      Swal.fire({
        title: "Solo se pueden agendar citas de lunes a viernes",
        icon: "error",
        timer: "3000",
      });
      return;
    }
    if (selectedDateMoment.isBefore(hoy, "day")) {
      Swal.fire({
        title: "No se puede agendar una cita en el pasado",
        icon: "error",
        timer: "3000",
      });
      return;
    }
    axios
      .post(`/api/appointment/${user.id}/add/${id}`, data)
      .then((res) => {
        console.log("cita agendada", res.data);
        Swal.fire({
          title: "Cita agendada",
          icon: "success",
          timer: "2000",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Ya tenes una cita agendada para esta propiedad",
          icon: "error",
          timer: "3000",
        });
      });
  };

  const lastRanking = properties.ranking;
  const lastReview = properties.review;

  const [rating, setRating] = useState(0); // initial rating value
  const [average, setAverage] = useState(0);
  const [review, setReview] = useState("");

  const newRating = [];

  const handleRating = (rate) => {
    setRating(rate);

    lastRanking.push(rate);
    let suma = 0;

    for (let i = 0; i < lastRanking.length; i++) {
      suma += lastRanking[i];
    }

    const average = (suma / lastRanking.length).toFixed(2);

    setAverage(average);

    axios
      .patch(`/api/property/${id}`, { ranking: lastRanking })
      .then((response) => {
        console.log("RESPUESTAA DEL EDITORR ", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const titulo = 2023;

  const handleSubmit = (event) => {
    lastReview.push(review);

    event.preventDefault();
    axios
      .patch(`/api/property/review/${id}`, { review: lastReview })
      .then((allReviews) => {
        /* console.log("TODAS LAS REVIEWSSS", allReviews); */
      })
      .catch((error) => {
        console.error(error);
      });
    setReview("");
  };

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  return (
    <>
      <Container className="prop-container">
        <Card>
          <div className="prop-images">
            <Carousel>
              {properties.image &&
                properties.image.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img src={img} alt={`Imagen ${index + 1}`} />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>

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
                <Container style={{ marginTop: ".5%" }}>
                  <Rating
                    onClick={handleRating}
                    ratingValue={rating}
                    size={25}
                    label
                    transition
                    fillColor="orange"
                    emptyColor="gray"
                    className="foo" // Will remove the inline style if applied
                  />
                  {/* {rating} */}
                </Container>

                <h6>Valoración = {average}</h6>

                <Button
                  className="btn-mas"
                  type="submit"
                  onClick={() => handleAddFavorites(properties.id)}
                >
                  Favorito
                </Button>
                <br></br>
                <br></br>

                <Container>
                  <form onSubmit={handleSubmit} className="btn-mas">
                    <label className="review-textarea">
                      Escriba su reseña:
                      <br></br>
                      {/* <br></br> */}
                      <textarea
                        value={review}
                        /* className="btn-mas"  */
                        /* style={{ borderBlockColor : "#123acb" }}  */
                        className="review-textarea"
                        onChange={handleChange}
                      />
                    </label>
                    <br></br>
                    <br></br>
                    <Button className="btn-mas" type="submit">
                      Enviar reseña
                    </Button>
                  </form>
                </Container>

                <Container>
                  <br></br>
                  <h5 style={{ color: "#123acb" }}>
                    Opiniones de los compradores
                  </h5>
                  <div>
                    {lastReview &&
                      lastReview.map((review, index) => (
                        <Card key={index} className="my-1 btn-mas">
                          <Card.Body>
                            <Card.Text>{review}</Card.Text>
                          </Card.Body>
                        </Card>
                      ))}
                  </div>
                </Container>

                <Button
                  className="btn-mas"
                  onClick={() => {
                    setIsScheduling(true);
                  }}
                >
                  Agendar visita
                </Button>
                {isScheduling ? (
                  <>
                    <div className="contenedor">
                      SELECCIONA LA FECHA DE TU CITA
                      <div className="center">
                        <ReactDatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat={"dd/MM/yyyy"}
                          showYearDropdown
                          scrollableMonthYearDropdown
                        />{" "}
                        <br />
                        <br />
                        <div className="container">
                          <TimePicker
                            value={selectedTime}
                            onChange={(time) => setSelectedTime(time)}
                            disableClock={false}
                          />
                        </div>{" "}
                        <br /> <br />
                        <input
                          type="button"
                          value="Agendar"
                          className="btn btn-primary"
                          onClick={() => {
                            handleAgendar(properties.id);
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ) : null}
          </Card.Body>
          {user.is_admin ? (
            <>
              <Link to={`/edit/${id}`}>
                <Button className="btn-mas">Editar Propiedad</Button>
              </Link>
              <Button className="btn-mas">Eliminar Propiedad</Button>
            </>
          ) : null}
        </Card.Body>
      </Container>
    </>
  );
};
