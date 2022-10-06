import React from "react";
import { useState, useEffect } from "react";
import {
    Modal,
    Col,
    Row,
    Button,
    ButtonGroup,
    ToggleButton,
    Card,
} from "react-bootstrap";

import ModalReservar from "./modal.reservar.js";
import ModalResenia from "./modal.view.js";
import "./Usuario.css";

function BuscarAuto(props) {
    const [search, setSearch] = useState("");
    const [auto, setAuto] = useState([]);
    const [tableAuto, setTableAuto] = useState([]);
    const [radioValue, setRadioValue] = useState("1");
    const [showModalReservar, setShowModalReservar] = useState(false);
    const [showModalResenia,setShowModalResenia] = useState(false);
    const [dataAuto, setDataAuto] = useState({});

    const radios = [
        { name: "Marca", value: "1", variant: "outline-dark" },
        { name: "Modelo", value: "2", variant: "outline-dark" },
        { name: "Rango precios", value: "3", variant: "outline-dark" }
    ];
    const showModal = (data) => {
        setShowModalReservar(true);
        setDataAuto(data);
        console.log(data)
    }

    const showModalRes = (data) => {
        setShowModalResenia(true);
        setDataAuto(data);
        console.log(data)
    }
    const handleChange = (e) => {
        setSearch(e.target.value);
        filtrar(e.target.value);
    };

    const filtrar = (terminosearch) => {
        var resultadossearch = tableAuto.filter((elemento) => {
            if (radioValue === "1") {
                if (
                    elemento.pais
                        .toLowerCase()
                        .includes(terminosearch.toLowerCase())
                ) {
                    return elemento;
                }
            } else if (radioValue === "2") {
                if (
                    elemento.ciudad
                        .toLowerCase()
                        .includes(terminosearch.toLowerCase())
                ) {
                    return elemento;
                }
            } /*
            else {
                if (elemento.color.toLowerCase().includes(terminosearch.toLowerCase())) {
                    return elemento;
                }
            }*/
        });
        //console.log(resultadossearch);
        setAuto(resultadossearch);
    };
    useEffect(() => {
        setAuto(data);
        setTableAuto(data);
    }, []);

    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton className="bodymodal">
                <Modal.Title id="contained-modal-title-vcenter ">
                    Buscar Automóvil
                </Modal.Title>
            </Modal.Header>
            <Row>
                <Col xs lg="2">
                    {" "}
                </Col>
                <Col md="auto">
                    <br />
                    <input
                        className="form-control"
                        value={search}
                        placeholder="Buscar"
                        onChange={handleChange}
                    />
                    <br />
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={radio.variant}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) =>
                                    setRadioValue(e.currentTarget.value)
                                }
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col xs lg="2"></Col>
            </Row>
            <Modal.Body>
                {auto.map((tab, index) => (
                    <Col key={index} className ="bodydiv">
                        <Card border="dark">
                            <Card.Img variant="top" src={tab.imagen} />
                            <Card.Body>
                                <Card.Title> {tab.marca} {"  "} {tab.modelo}</Card.Title>
                                <Card.Text>
                                    <b> Estado: </b>{" "}
                                    {tab.estado}
                                    <br />
                                    <b> Placa: </b>{" "}
                                    {tab.placa}
                                    <br />
                                    <b> Precio: </b> {tab.precio}
                                    <br />
                                </Card.Text>
                                <Button
                                    variant="dark"
                                    onClick={() => showModal(tab)}
                                >
                                    <ion-icon name="add-circle"></ion-icon>
                                </Button>
                                {"  "} 
                                <Button variant="dark" onClick={() => showModalRes(tab)}>
                                    <ion-icon name="eye"></ion-icon>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}

                {/* SECCION DE MODALS */}
                {/* RESERVAR SERCIVICIO */}
                <ModalReservar
                    show={showModalReservar}
                    onHide={() => setShowModalReservar(false)}
                    data={dataAuto}
                    showoption={2}
                />

                {/* VER SERVICIO */}
                <ModalResenia
                    show={showModalResenia}
                    onHide={() => setShowModalResenia(false)}
                    data={dataAuto}
                    showoption={2}
                />
            </Modal.Body>
        </Modal>
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


export default BuscarAuto;
