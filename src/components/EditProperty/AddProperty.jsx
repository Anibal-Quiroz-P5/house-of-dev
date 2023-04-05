import axios from "axios";
import React, { useState } from "react";
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
    <div>
      <br />
      <br />
      <div>Agregar una propiedad</div>
      <br /> <br />
      <form onSubmit={handleAdd}>
        <label>Título:</label> <br /> <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br /> <br />
        <label>Dirección:</label> <br /> <br />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />{" "}
        <br />
        <br />
        <label>Ciudad:</label> <br /> <br />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />{" "}
        <br />
        <br />
        <label>Provincia:</label> <br /> <br />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />{" "}
        <br /> <br />
        <label>País:</label> <br /> <br />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />{" "}
        <br />
        <br />
        <label>Descipción:</label> <br /> <br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />{" "}
        <br /> <br />
        <label>Precio:</label> <br /> <br />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />{" "}
        <br />
        <br />
        <label>Imágenes:</label> <br /> <br />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage([e.target.value])}
        />{" "}
        <br /> <br />
        <label>Ambientes:</label> <br /> <br />
        <input
          type="text"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        />{" "}
        <br /> <br />
        <label>Área:</label> <br /> <br />
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />{" "}
        <br />
        <br />
        <label>Habitaciones:</label> <br /> <br />
        <input
          type="text"
          value={bedroom}
          onChange={(e) => setBedroom(e.target.value)}
        />{" "}
        <br />
        <br />
        <label>Baños:</label> <br /> <br />
        <input
          type="text"
          value={bathroom}
          onChange={(e) => setBathroom(e.target.value)}
        />{" "}
        <br /> <br />
        <label>Condición:</label> <br /> <br />
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />{" "}
        <br />
        <br />
        <label>Tipo:</label> <br /> <br />
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />{" "}
        <br /> <br /> <br />
        <button>Agregar</button>
      </form>
    </div>
  );
};

export default AddProperty;
