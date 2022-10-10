import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from "react-bootstrap/Card";
import img from "../../images/image1.jpg";
import Swal from "sweetalert2";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ModalHotel from "./modal.buscar.hotel.js";
import ModalAuto from "./modal.buscar.auto.js";
import ModalResenia from "./modal.resenia.js";
import ModalVuelo from "./modal.buscar.vuelo.js";
import axios from "axios";
import "./Usuario.css";

function Usuario(props) {
    const [showModal, setShowModal] = useState(false);
    const [showModalAuto, setShowModalAuto] = useState(false);
    const [showModalResenia, setShowModalResenia] = useState(false);
    const [showModalVuelo, setShowModalVuelo] = useState(false);
    const [dataService, setDataService] = useState(null);
    const [option,setOption] = useState(0);
    useEffect(() => {
        handlerData();
    }, []);

    const handlerData = async () => {
        try {
            // obtener servicios del cliente
            const id_User = { id_user: props.userdata.id_user };
            console.log(id_User);
            //const res= await axios.post(" http://35.239.122.121:4000/api/fulltrip/v1/hotel/rooms");
            //setHotel(res.data.data);
            //setTableHotel(res.data.data);
        } catch (ex) {
            console.log(ex);
        }
    };

    const handlerRating = (option,id) => {
        setOption(option);
        setDataService(id);
        setShowModalResenia(true);
    };

    return (
        <Container>
            <Row className="bodydiv">
                <h3>Adquirir Servicios</h3>
                <Col xs={2} md={4}></Col>
                <Col xs={8} md={4}>
                    <ButtonGroup size="lg" className="mb-2">
                        <Button
                            variant="secondary"
                            onClick={() => setShowModalAuto(true)}
                        >
                            Autos {"  "}
                            <ion-icon size="large" name="car-sport"></ion-icon>
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setShowModal(true)}
                        >
                            Hoteles {"  "}
                            <ion-icon size="large" name="bed"></ion-icon>
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setShowModalVuelo(true)}
                        >
                            Vuelos {"  "}
                            <ion-icon size="large" name="airplane"></ion-icon>
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col xs={2} md={4}></Col>
            </Row>
            <Row>
                <h5>Mis servicios</h5>
            </Row>

            <Row>
                <Tabs
                    defaultActiveKey="Habitaciones"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="Habitaciones" title="Habitaciones">
                        <Row xs={1} md={2} className="g-4 ">
                            {data.hotel.map((tab, index) => (
                                <Col key={index} style={{ width: "17rem" }}>
                                    <Card border="dark">
                                        <Card.Img
                                            variant="top"
                                            src={tab.imagen}
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                Hotel {tab.nombre_hotel}
                                            </Card.Title>
                                            <Card.Text>
                                                {tab.descripcion}
                                                <br />
                                                <b> Fecha Incio: </b>{" "}
                                                {tab.startDate}
                                                <b> Fecha Fin : </b>{" "}
                                                {tab.endDate}
                                                <b>
                                                    {" "}
                                                    Cantidad Reservada :{" "}
                                                </b>{" "}
                                                {tab.cantidad} Habitaciones
                                                <br />
                                                <b> Precio Total $ : </b>{" "}
                                                {tab.precio_total}
                                                <br />
                                                <b> Pais: </b> {tab.pais}
                                                <b> Ciudad: </b> {tab.ciudad}
                                            </Card.Text>
                                            <Button
                                                variant="dark"
                                                onClick={() =>
                                                    handlerRating(
                                                        1,
                                                        tab.id_service
                                                    )
                                                }
                                            >
                                                Calificar
                                            </Button>
                                            {"  "}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                    <Tab eventKey="Autos" title="Habitaciones">
                        <Row xs={1} md={2} className="g-4 ">
                            {data.auto.map((tab, index) => (
                                <Col key={index} style={{ width: "17rem" }}>
                                    <Card border="dark">
                                        <Card.Img
                                            variant="top"
                                            src={tab.imagen}
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {tab.marca} - {tab.modelo}
                                            </Card.Title>
                                            <Card.Text>
                                                <br />
                                                <b> Placa : </b> {tab.placa}
                                                <br />
                                                <b> Fecha Incio: </b>{" "}
                                                {tab.startDate}
                                                <br />
                                                <b> Fecha Fin : </b>{" "}
                                                {tab.endDate}
                                                <br />
                                                <b> Precio Total : </b>{" "}
                                                {tab.precio_total}
                                                <br />
                                            </Card.Text>
                                            <Button
                                                variant="dark"
                                                onClick={() =>
                                                    handlerRating(
                                                        2,
                                                        tab.id_service
                                                    )
                                                }
                                            >
                                                Calificar
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                    <Tab eventKey="vuelos" title="Vuelos">
                        <Row xs={1} md={2} className="g-4 ">
                            {data.vuelo.map((tab, index) => (
                                <Col key={index} style={{ width: "17rem" }}>
                                    <Card border="dark">
                                        <Card.Img
                                            variant="top"
                                            src={tab.imagen}
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {tab.nombre_aerolinea} -{" "}
                                                {tab.modelo}
                                            </Card.Title>
                                            <Card.Text>
                                                <br />
                                                <b> Destino: </b> {tab.Destino}
                                                <br />
                                                <b> Fecha de vuelo: </b>{" "}
                                                {tab.fecha_salida}
                                                <br />
                                                <b>
                                                    {" "}
                                                    Boletos comprados :{" "}
                                                </b>{" "}
                                                {tab.cantidad_asientos}
                                                <br />
                                                <b> Precio Total : </b>{" "}
                                                {tab.precio_total}
                                                <br />
                                                <b> Tipo de vuelo : </b>{" "}
                                                {tab.tipo}
                                                <br />
                                            </Card.Text>
                                            <Button
                                                variant="dark"
                                                onClick={() =>
                                                    handlerRating(
                                                        3,
                                                        tab.id_service
                                                    )
                                                }
                                            >
                                                Calificar
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                </Tabs>
            </Row>
            <Row>
                <ModalHotel
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    userdata={props.userdata}
                />
                <ModalAuto
                    show={showModalAuto}
                    onHide={() => setShowModalAuto(false)}
                    userdata={props.userdata}
                />
                <ModalResenia
                    show={showModalResenia}
                    onHide={() => setShowModalResenia(false)}
                    userdata={props.userdata}
                    dataService={dataService}
                    option={option}
                />
                <ModalVuelo
                    show={showModalVuelo}
                    onHide={() => setShowModalVuelo(false)}
                    userdata={props.userdata}
                />
            </Row>
        </Container>
    );
}
const data = {
    hotel: [
        {
            cantidad: 1,
            nombre_hotel: "test",
            pais: "Albania",
            ciudad: "Tirana",
            descripcion: "Habitación doble",
            startDate: "2021-10-10",
            endDate: "2021-10-10",
            id_habitacion: 1,
            imagen: "https://storage.googleapis.com/bucket_fulltrip/39603_r_1366_2000.jpg",
            precio_total: 200,
            id_service: 1,
            resenia: "Muy bueno",
           
        },
        {
            cantidad: 1,
            nombre_hotel: "test",
            pais: "Albania",
            ciudad: "Tirana",
            descripcion: "Habitación doble",
            startDate: "2021-10-10",
            endDate: "2021-10-10",
            id_habitacion: 1,
            imagen: "https://storage.googleapis.com/bucket_fulltrip/39603_r_1366_2000.jpg",
            precio_total: 200,
            id_service: 1,
            resenia: "Muy bueno",
        },
    ],
    auto: [
        {      
            imagen: "https://storage.googleapis.com/bucket_fulltrip/2393_84c25kdnhqx41.jpg",
            marca:"Toyota",
            modelo:"2010",
            placa:"TTTT01",
            precio_total:530,
            startDate: "2021-10-10",
            endDate: "2021-10-10",
            id_service: 1,
            resenia: "Muy bueno"
        }
        ],
    vuelo: [{
        Destino: "Antigua Guatemala,Guatemala",
        cantidad_asientos:2,
        aerolinea:"Aero Test",
        fecha_salida: "2022-10-07",
        imagen:"https://storage.googleapis.com/bucket_fulltrip/3919_A_450_1000.jpg",
        nombre_aerolinea: "Aero Test",
        precio_total: 200,
        tipo:"Ida y vuelta",
        id_service: 1,
        resenia: null
    }],
};


/*
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
                                </Button> */
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
