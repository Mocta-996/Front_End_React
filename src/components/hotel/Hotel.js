import React from "react";
import { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Hotel.css";
import ModalHotel from "./modal.hotel";
import Card from "react-bootstrap/Card";
import img from "../../images/image1.jpg";
import Swal from "sweetalert2";
import axios from "axios";

function Hotel(props) {
    const [showModal, setShowModal] = useState(false);
    const [dataHotel, setDataHotel] = useState([]);

    useEffect(() => {
        handlerData();
    }, []);

    const handlerData = async () => {
        try{
            const id_ = {id_hotel:props.hotel_id};
            console.log(id_)
            const res= await axios.post("http://35.239.122.121:4000/api/fulltrip/v1/hotel/getData",{info:JSON.stringify(id_)});
            setDataHotel(res.data.data);
          }catch(ex){
            console.log(ex);
            Error();
          }
    };

    return (
        <Container>
            <Row className="bodydiv">
                <Col xs={2} md={4}></Col>
                <Col xs={8} md={4}>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(true)}
                    >
                        Agregar habitación
                    </Button>
                </Col>
                <Col xs={2} md={4}></Col>
            </Row>
            <Row>
                <h2>Servicios del hotel: {props.name_hotel}</h2>
                <br/>
                <br/>
            </Row>
            <Row xs={1} md={2} className="g-4 ">
                {dataHotel.map((tab, index) => (
                    <Col key={index} style={{ width: "17rem" }}>
                        <Card border="dark">
                            <Card.Img variant="top" src={tab.imagen} />
                            <Card.Body>
                                <Card.Title>Habitación </Card.Title>
                                <Card.Text>
                                    {tab.descripcion}
                                    <br />
                                    <b> Capacidad: </b>{" "}
                                    {tab.capacidad}
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
                                    onClick={() => questionDelete(tab.id_habitacion)}
                                >
                                    <ion-icon name="trash-sharp"></ion-icon>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <ModalHotel
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    hotel_id={props.hotel_id}
                    update={handlerData}
                />
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


const Error = () => {
    Swal.fire("Error","Ocurrio un problema, intente más tarde", "error");
};
export default Hotel;
