import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";

const AddProperty = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState([]);
  const [rooms, setRooms] = useState();
  const [area, setArea] = useState();
  const [bedroom, setBedroom] = useState();
  const [bathroom, setBathroom] = useState();
  const [condition, setCondition] = useState("");
  const [type, setType] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(
        "/api/property/add",
        {
          title: title,
          address: address,
          city: city,
          state: state,
          country: country,
          description: description,
          price: price,
          image: image[0].split(","),
          rooms: rooms,
          area: area,
          bedroom: bedroom,
          bathroom: bathroom,
          condition: condition,
          type: type,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("r3esdata", res.data);
        navigate("/propiedades");
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div className="cont-edit-prop">
      <div className="cont-titulo">
        <h3 className="h3-house">AGREGAR PROPIEDAD</h3>
      </div>
      <form className="form-login" onSubmit={handleAdd}>
        <Form.Group className="form-inputs">
          <Form.Label>Título</Form.Label>
          <input
            className="form-inputs"
            placeholder="Ingrese el nuevo titulo"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <Form.Label>Direccion</Form.Label>
          <input
            placeholder="Ingrese la nueva dirección"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <Form.Label>Ciudad</Form.Label>
          <input
            placeholder="Ingrese la nueva ciudad"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <Form.Label>Provincia</Form.Label>
          <input
            placeholder="Ingrese la nueva Provincia"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <Form.Label>País</Form.Label>
          <input
            placeholder="Ingrese el nuevo país"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <Form.Label>Descripción</Form.Label>
          <input
            placeholder="Ingrese la nueva descripción"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <Form.Label>Precio</Form.Label>
          <input
            placeholder="Ingrese el nuevo precio"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <Form.Label>Imágenes</Form.Label>
          <input
            placeholder="Ingrese las nuevas imágenes"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <Form.Label>Ambientes</Form.Label>
          <input
            type="text"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />{" "}
          <br />
          <Form.Group className="form-inputs">
            <Form.Label>Área</Form.Label>
            <input
              placeholder="Ingrese la nueva área"
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />{" "}
          </Form.Group>
          <Form.Group className="form-inputs">
            <Form.Label>Habitaciones</Form.Label>
            <input
              placeholder="Ingrese las nuevas habitaciones"
              type="text"
              value={bedroom}
              onChange={(e) => setBedroom(e.target.value)}
            />{" "}
          </Form.Group>
          <Form.Label>Baños</Form.Label>
          <input
            type="text"
            value={bathroom}
            onChange={(e) => setBathroom(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <Form.Label>Condición</Form.Label>
          <input
            placeholder="Ingrese la nueva condición"
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />{" "}
        </Form.Group>
        <Form.Group className="form-inputs">
          <Form.Label>Tipo</Form.Label>
          <input
            placeholder="Ingrese el tipo de propiedad"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />{" "}
        </Form.Group>
        <button className="btn-login">Agregar</button>
      </form>
    </div>
  );
};

export default AddProperty;
