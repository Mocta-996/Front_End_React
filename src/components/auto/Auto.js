import React from "react";
import { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Auto.css";
import ModalAuto from "./modal.auto.js";
import Card from "react-bootstrap/Card";
import img from "../../images/image1.jpg";
import Swal from "sweetalert2";
import axios from "axios";

function Auto(props) {
    const [showModal, setShowModal] = useState(false);
    const [dataRental, setDataRental] = useState([]);

    useEffect(() => {
        handlerData();
    }, []);

    const handlerData = async () => {
        try{
            const id_ = {id_alquiler:props.rental_id};
            console.log("id",id_)
            const res= await axios.post("http://35.239.122.121:4000/api/fulltrip/v1/rentaautos/getData",{info:JSON.stringify(id_)});
            setDataRental(res.data.data);
            console.log("res",res)
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
                        Agregar Automóvil
                    </Button>
                </Col>
                <Col xs={2} md={4}></Col>
            </Row>
            <Row>
                <h2>Rental :   {props.name_rental}</h2>
                <br/>
                <br/>
            </Row>
            <Row xs={1} md={2} className="g-4 ">
                {dataRental.map((tab, index) => (
                    <Col key={index} style={{ width: "17rem" }}>
                        <Card border="dark">
                            <Card.Img variant="top" src={tab.imagen} />
                            <Card.Body>
                                <Card.Title> {tab.marca} - {tab.modelo}</Card.Title>
                                <Card.Text>
                                    <br />
                                    <b> Placa: </b>{" "}
                                    {tab.placa}
                                    <br />
                                    <b> Precio: </b> {tab.precio}
                                    <br />
                                    <b> Estado: </b>{" "}
                                    {tab.estado}
                                </Card.Text>
                                <Button variant="dark">
                                    <ion-icon name="create-sharp"></ion-icon>
                                </Button>
                                {"  "}
                                <Button
                                    variant="danger"
                                    onClick={() => questionDelete(tab.auto_id)}
                                >
                                    <ion-icon name="trash-sharp"></ion-icon>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <ModalAuto 
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    rental_id={props.rental_id}
                    update={handlerData}
                />
            </Row>
        </Container>
    );
}
const data = [
    {
        marca:"toyota",
        placa: "1234",
        modelo: "yaris",
        precio:100,
        rental_id: 1,
        imagen: "../../images/image1.jpg",
        estado: "Disponible",
        auto_id: 1
    },
    {
        marca:"toyota",
        placa: "1234",
        modelo: "yaris",
        precio:100,
        rental_id: 1,
        imagen: "../../images/image1.jpg",
        estado: "No Disponible",
        auto_id: 1
    },
    {
        marca:"toyota",
        placa: "1234",
        modelo: "yaris",
        precio:100,
        rental_id: 1,
        imagen: "../../images/image1.jpg",
        estado: "Disponible",
        auto_id: 1
    }
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

export default Auto;
