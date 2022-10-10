import React from "react";
import { useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Aerolinea.css";
import ModalAerolinea from "./modal.aerolinea.js";
import Card from "react-bootstrap/Card";
import img from "../../images/image1.jpg";
import Swal from "sweetalert2";
import axios from "axios";
import ModalResenia from "../Usuario/modal.view.js";

function Aerolinea(props) {
    const [showModal, setShowModal] = useState(false);
    const [dataAirline, setDataAirline] = useState([]);
    const [showModalResenia,setShowModalResenia] = useState(false);
    const [data_vuelo,setData_vuelo] = useState(null);

    useEffect(() => {
        handlerData();
    }, []);

    const showModalRes = (data) => {
        setShowModalResenia(true);
        setData_vuelo(data);
        console.log(data)
    }

    const handlerData = async () => {
        try{
            const id_ = {id_aerolinea:props.airline_id};
            console.log("id",id_)
            const res= await axios.post("http://35.239.122.121:4000/api/fulltrip/v1/aerolinea/getData",{info:JSON.stringify(id_)});
            setDataAirline(res.data.data);
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
                        Agregar Vuelo
                    </Button>
                </Col>
                <Col xs={2} md={4}></Col>
            </Row>
            <Row>
                <h2>Aerolínea : aqui va el nombre de la aerolinea</h2>
                <br/>
                <br/>
            </Row>
            <Row xs={1} md={2} className="g-4 ">
                {dataAirline.map((tab, index) => (
                    <Col key={index} style={{ width: "17rem" }}>
                        <Card border="dark">
                            <Card.Img variant="top" src={tab.imagen} />
                            <Card.Body>
                                <Card.Title> Vuelo  - {tab.destino_vuelo}</Card.Title>
                                <Card.Text>
                                    <br />
                                    <b> Fecha de vuelo: </b>{" "}
                                    {tab.fecha_vuelo}
                                    <br />
                                    <b> Precio: $ </b> {tab.precio}
                                    <br />
                                    <b> Cantidad disponible: </b>{" "}
                                    {tab.cantidad_disponible}
                                    <b> Tipo de vuelo: </b>{" "}
                                    {tab.tipo_vuelo}

                                </Card.Text>
                                <Button variant="dark" onClick={() => showModalRes(tab)} >
                                        Ver Reseñas 
                                    </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <ModalAerolinea
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    airline_id={props.airline_id}
                    update={handlerData}
                />
            </Row>

            <Row>
            <ModalResenia
                    show={showModalResenia}
                    onHide={() => setShowModalResenia(false)}
                    data={data_vuelo}
                    showoption={1}
                />
            </Row>
        </Container>
    );
}
const data = [
    {
        id_vuelo: 1,
        id_aerolinea: 1,
        cantidad_disponible: 100,
        destino_vuelo: "Bogota",
        fecha_vuelo: "2021-10-10",
        imagen: "../../images/image1.jpg",
        precio: 100000,
        tipo_vuelo: "Ida"
    },
    {
        id_vuelo: 1,
        id_aerolinea: 1,
        cantidad_disponible: 100,
        destino_vuelo: "Bogota",
        fecha_vuelo: "2021-10-10",
        imagen: "../../images/image1.jpg",
        precio: 100000,
        tipo_vuelo: "Ida"
    },
    {
        id_vuelo: 1,
        id_aerolinea: 1,
        cantidad_disponible: 100,
        destino_vuelo: "Bogota",
        fecha_vuelo: "2021-10-10",
        imagen: "../../images/image1.jpg",
        precio: 100000,
        tipo_vuelo: "Ida"
    }
];

// eliminar habitacion
const questionDelete = (e) => {
    const { id } = e;
    Swal.fire({
        title: "¿Estas seguro de quitar el vuelo?",
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

export default Aerolinea;
