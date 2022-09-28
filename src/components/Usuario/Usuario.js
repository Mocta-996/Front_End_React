import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Usuario.css";
import Card from "react-bootstrap/Card";
import img from "../../images/image1.jpg";
import Swal from "sweetalert2";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ModalHotel from "./modal.buscar.hotel.js";

function Usuario(props) {
    const [showModal, setShowModal] = useState(false);
    

    return (
        <Container>
            <Row className="bodydiv">
                <h2>Buscar</h2>
                <Col xs={2} md={4}></Col>
                <Col xs={8} md={4}>
                    <ButtonGroup size="lg" className="mb-2">
                        <Button variant="secondary" >Autos {"  "}
                        <ion-icon size="large" name="car-sport"></ion-icon>
                        </Button>
                        <Button variant="secondary"  onClick={() =>
                                        setShowModal(true)
                                    }>Hoteles {"  "}
                        <ion-icon size="large" name="bed"></ion-icon>
                        </Button>
                        <Button variant="secondary" >Vuelos {"  "}
                        <ion-icon size="large" name="airplane"></ion-icon>
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col xs={2} md={4}></Col>
            </Row>
            <Row>
                <h2>Servicios del hotel: aqui va el nombre del hotel</h2>
                <br />
                <br />
            </Row>
            <Row xs={1} md={2} className="g-4 ">
                {data.map((tab, index) => (
                    <Col key={index} style={{ width: "17rem" }}>
                        <Card border="dark">
                            <Card.Img variant="top" src={img} />
                            <Card.Body>
                                <Card.Title>Habitación {tab.numero}</Card.Title>
                                <Card.Text>
                                    {tab.descripcion}
                                    <br />
                                    <b> Cantidad Disponible: </b>{" "}
                                    {tab.cantidad_disponible}
                                    <br />
                                    <b> Precio: </b> {tab.precio}
                                    <br />
                                    <b> Fecha Disponibilidad: </b>{" "}
                                    {tab.fecha_disponibilidad}
                                </Card.Text>
                                <Button variant="dark">
                                    <ion-icon name="create-sharp"></ion-icon>
                                </Button>
                                {"  "}
                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        questionDelete(tab.id_habitacion)
                                    }
                                >
                                    <ion-icon name="trash-sharp"></ion-icon>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
            <ModalHotel show={showModal} onHide={() => setShowModal(false)} />
            </Row>
            
        </Container>
    );
}
const data = [
    {
        cantidad_disponible: 1,
        descripcion: "Habitación doble",
        fecha_disponibilidad: "2021-10-10",
        id_habitacion: 1,
        imagen: "../../images/image1.jpg",
        numero: 1,
        precio: 100,
    },
    {
        cantidad_disponible: 1,
        descripcion: "Habitación doble",
        fecha_disponibilidad: "2021-10-10",
        id_habitacion: 1,
        imagen: "../../images/image1.jpg",
        numero: 1,
        precio: 100,
    },
    {
        cantidad_disponible: "1",
        descripcion: "Habitación doble",
        fecha_disponibilidad: "2021-10-10",
        id_habitacion: 1,
        imagen: "../../images/image1.jpg",
        numero: 1,
        precio: 100,
    },
    {
        cantidad_disponible: 1,
        descripcion: "Habitación doble",
        fecha_disponibilidad: "2021-10-10",
        hotel_id: 1,
        imagen: "../../images/image1.jpg",
        numero: 1,
        precio: 100,
    },
];

// eliminar habitacion
const questionDelete = (e) => {
    const { id } = e;
    Swal.fire({
        title: "¿Estas seguro de eliminar la habitación?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "No",
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("eliminado con id: " + e);
        }
    });
};

export default Usuario;
