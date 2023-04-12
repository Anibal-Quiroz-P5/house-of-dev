import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [rooms, setRooms] = useState(0);
  const [area, setArea] = useState(0);
  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [condition, setCondition] = useState("");
  const [type, setType] = useState("");

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `/api/property/update/${id}`,
        {
          title,
          address,
          city,
          state,
          country,
          description,
          price,
          image,
          rooms,
          area,
          bedroom,
          bathroom,
          condition,
          type,
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
      <h1>Editar una propiedad</h1>
      <form onSubmit={handleEdit}>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        <label>Dirección:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />{" "}
        <br />
        <label>Ciudad:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />{" "}
        <br />
        <label>Provincia:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />{" "}
        <br />
        <label>País:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />{" "}
        <br />
        <label>Descipción:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />{" "}
        <br />
        <label>Precio:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />{" "}
        <br />
        <label>Imágenes:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />{" "}
        <br />
        <label>Ambientes:</label>
        <input
          type="text"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        />{" "}
        <br />
        <label>Área:</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />{" "}
        <br />
        <label>Habitaciones:</label>
        <input
          type="text"
          value={bedroom}
          onChange={(e) => setBedroom(e.target.value)}
        />{" "}
        <br />
        <label>Baños:</label>
        <input
          type="text"
          value={bathroom}
          onChange={(e) => setBathroom(e.target.value)}
        />{" "}
        <br />
        <label>Condición:</label>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />{" "}
        <br />
        <label>Tipo:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />{" "}
        <br />
        <button>Editar</button>
      </form>
    </div>
  );
};

export default EditProperty;
