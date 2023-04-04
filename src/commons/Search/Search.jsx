import axios from 'axios'
import React, { useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { BiBath, BiBed, BiPhoneCall } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { RxRulerSquare } from "react-icons/rx";
import { MdFavoriteBorder } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

export const Search = () => {
    const [searchResults, setSearchResults] = useState([])
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
      setQuery(e.target.value);
    };
    
    
    const handleSearch = () => {
      axios.get(`/api/property/buscar/${query}`)
      .then(response => {
        console.log('Respuesta de búsqueda:', response.data);
        setSearchResults(response.data)
      })
      .catch(error => {
        console.log('Error al realizar la búsqueda:', error);
      });
    
      console.log('Realizando búsqueda con la query:', query);
    };

    
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };
  console.log( " SEARCH RESULTSSS", searchResults );
    return (

    <div>
            <Form className="d-flex" >
            <Form.Control
            type="search"
            placeholder="Busca tu propiedad"
            className="me-2"
            aria-label="Search"
            value={query}
            onChange={handleInputChange}
            keypress={handleKeyPress}
            />

            <Button variant="outline-light"  onClick={handleSearch}>Buscar</Button>
            </Form>

            <div>
                {searchResults.map((propiedad, i) => {
                    return (

                    <Col className="col-grid col-md-offset-2" sm={6}>
                         {console.log( " PROPIEDAD", propiedad )}
                    <Card.Body>
                      <Row>
                        <Col className="col-grid" sm={12}>
                          <Card.Title>{propiedad.title}</Card.Title>
                        </Col>
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
                            <BiBath className="botones-info" /> {propiedad.bathroom}{" "}
                            Baños
                          </Form.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="col-grid" sm={12}>
                          <Form.Text className="text-muted">
                            {propiedad.description.length > 250
                              ? `${propiedad.description.substring(0, 250)}...`
                              : propiedad.description}
                          </Form.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Body className="botones-div">
                      <Button className="botones-cta">
                        <MdFavoriteBorder className="boton-cta" />
                      </Button>
                      <Button className="botones-cta">
                        <BiPhoneCall className="boton-cta" />
                      </Button>
                      <Link to={`/property/${propiedad.id}`}>
                        <Button className="buttonVerMas">VER MÁS</Button>
                      </Link>
                    </Card.Body>
                  </Col>
                    )
                })}

            </div>
            
    </div>
  )
}
