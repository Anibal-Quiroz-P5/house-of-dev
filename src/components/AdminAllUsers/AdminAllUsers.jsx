import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, ListGroup, Container, Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export function AdminAllUsers() {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [favs, setFavs] = useState([]);
  const [miVariable, setMiVariable] = useState(1);

  const userLogueado = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    axios
      .get("/api/admin/")
      .then((res) => {
        const filtrados = res.data.filter((e) => e.id !== userLogueado.id);
        setUsers(filtrados);
      })
      .catch((error) => console.log(error));
  }, [users]);

  const handleRevoke = (id) => {
    axios
      .put(`/api/admin/revoke/${id}`, { id }, { withCredentials: true })
      .then((res) => console.log("Es admin", res.data));
  };

  const handlePromote = (id) => {
    axios
      .put(`/api/admin/${id}`, { id }, { withCredentials: true })
      .then((res) => console.log("Es admin", res.data));
  };

  const handleDelete = (id) => {
    if (id) {
      Swal.fire({
        title: "Alerta",
        text: "¿Seguro quieres eliminar este usuario?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: "No",
        confirmButtonColor: "#123AC8",
      }).then((response) => {
        if (response.isConfirmed) {
          axios
            .delete(`/api/admin/delete/${id}`, {
              withCredentials: true,
            })
            .then(() => {
              setUsers(users.filter((user) => user.id !== id));
              Swal.fire({
                title: "Alerta",
                text: "Usuario eliminado",
                icon: "success",
                confirmButtonText: "ok",
                timer: "2000",
              });
            });
        } else {
          Swal.fire({
            title: "Alerta",
            icon: "error",
            html: "El usuario no fue eliminado",
            timer: "2000",
          });
        }
      });
    }
  };

  const handleFavs = (id) => {
    axios.get(`/api/favourites/${id}/favourites`).then((res) => {
      console.log("soy los favoritos de este usuario", res.data.properties);
      setFavs(res.data.properties);
      if (miVariable === 1) {
        setMiVariable(0);
      } else {
        setMiVariable(1);
      }
    });
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
            PANEL DE USUARIOS - TOTAL : ({users.length})
          </Col>
        </Row>
      </div>
      <Container>
        <Table
          style={{
            marginTop: "2%",
            border: "2px solid #123acb",
          }}
          striped
        >
          <thead style={{ backgroundColor: "#fe4236", color: "white" }}>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Admin</th>
              <th>Eliminar</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {" "}
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ textAlign: "center" }}>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.is_admin ? "True" : "False"}</td>
                <td>
                  <Button
                    className="boton-delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </Button>
                </td>
                <td>
                  {user.is_admin ? (
                    <Button
                      className="boton-edit"
                      onClick={() => handleRevoke(user.id)}
                    >
                      Revocar
                    </Button>
                  ) : (
                    <Button
                      className="boton-edit"
                      onClick={() => handlePromote(user.id)}
                    >
                      Promover
                    </Button>
                  )}

                  <Button
                    className="boton-edit"
                    onClick={() => handleFavs(user.id)}
                  >
                    Ver favoritos
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </section>
  );
}
