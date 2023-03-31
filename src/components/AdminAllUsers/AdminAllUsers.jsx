import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, ListGroup, Container, Button } from "react-bootstrap";
export function AdminAllUsers() {
  const [users, setUsers] = useState([]);

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

  const handleDelete = (id) => {
    axios
      .delete(`/api/admin/delete/${id}`, {})
      .then((res) => {
        console.log("user eliminado");
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
            PANEL DE USUARIOS - TOTAL : ({users.length})
          </Col>
        </Row>
      </div>
      <Container className="centerList">
        <ListGroup as="ol" numbered>
          {users.map((user, i) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">{user.email}</div>

              <Button
                className="boton-delete"
                onClick={() => handleDelete(user.id)}
              >
                Eliminar
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </section>
  );
}
