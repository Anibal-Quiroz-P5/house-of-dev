import React, { useEffect, useState } from "react";
import { Card, Container, Form, ListGroup, Button } from "react-bootstrap";
import "./Property.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

import { useDispatch, useSelector } from "react-redux";
import { addToFavs, setUser } from "../../state/user";


export const Property = () => {
  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  // const [user, setUser] = useState({});
  const [favourites, setFavourites] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isScheduling, setIsScheduling] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);


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
        console.log("agregado correctamente", res.data);
        dispatch(addToFavs(res.data));
      })
      .catch((error) => console.log(error));
  };

  const handleAgendar = (id) => {
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    const data = { date: formattedDate, time: selectedTime };
    console.log("fecha formateada", data);

    axios.post(`/api/appointment/${user.id}/add/${id}`, data).then((res) => {
      console.log(user.id, id);
      console.log("cita agendada", res.data);
    });
  };
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
                <Button
                  className="buttonStyle"
                  type="submit"
                  onClick={() => handleAddFavorites(properties.id)}
                >
                  Favorito
                </Button>
                <Button
                  className="buttonStyle"
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
                          // filterDate={(date) => date.getDay() !== 5}
                          showYearDropdown
                          scrollableMonthYearDropdown
                        />{" "}
                        <br />
                        <br />
                        <div className="container">
                          <TimePicker
                            value={selectedTime}
                            onChange={(time) => setSelectedTime(time)}
                            disableClock={true}
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
                <Button className="buttonStyle">Editar Propiedad</Button>
              </Link>
              <Button className="buttonStyle">Eliminar Propiedad</Button>
            </>
          ) : null}
        </Card.Body>
      </Container>
    </>
  );
};
