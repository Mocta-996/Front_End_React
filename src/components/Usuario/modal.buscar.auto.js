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
import Swal from "sweetalert2";
import axios from "axios";

function BuscarAuto(props) {
    const [search, setSearch] = useState("");
    const [auto, setAuto] = useState([]);
    const [tableAuto, setTableAuto] = useState([]);
    const [radioValue, setRadioValue] = useState("1");
    const [showModalReservar, setShowModalReservar] = useState(false);
    const [showModalResenia,setShowModalResenia] = useState(false);
    const [dataAuto, setDataAuto] = useState({});
    const [rangemin, setRangemin] = useState(0);
    const [rangemax, setRangemax] = useState(1000);

    const radios = [
        { name: "Marca", value: "1", variant: "outline-dark" },
        { name: "Modelo", value: "2", variant: "outline-dark" },
        { name: "Rango precios", value: "3", variant: "outline-dark" }
    ];
    const showModal = (data) => {
        
        setDataAuto(data);
     
        setShowModalReservar(true);
    }

    const showModalRes = (data) => {
        setShowModalResenia(true);
        setDataAuto(data);
       
    }
    const handleChange = (e) => {
        setSearch(e.target.value);
        filtrar(e.target.value);
    };

    const filtrar = (terminosearch) => {
        var resultadossearch = tableAuto.filter((elemento) => {
            if (radioValue === "1") {
                if (
                    elemento.marca
                        .toLowerCase()
                        .includes(terminosearch.toLowerCase())
                ) {
                    return elemento;
                }
            } else if (radioValue === "2") {
                if (
                    elemento.modelo
                        .toLowerCase()
                        .includes(terminosearch.toLowerCase())
                ) {
                    return elemento;
                }
            }else {
                return elemento.precio>= rangemin && elemento.precio <= rangemax;
            }
        });
        setAuto(resultadossearch);
    };

    const handlerData = async () => {
        try{
            const res= await axios.get("http://35.239.122.121:4000/api/fulltrip/v1/rentaautos/cars");
           
            setAuto(res.data.data);
            setTableAuto(res.data.data);
          }catch(ex){
            console.log(ex);
            Error();
          }
    };


    useEffect(() => {
        handlerData();
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
                      {(() => {
                        switch (radioValue) {
                            case "3":
                                return (
                                    <Row>
                                        <Col>
                                            <input
                                                className="form-control"
                                                value={rangemin}
                                                placeholder="Precio minimo"
                                                type="number"
                                                onChange={(e) => {setRangemin(e.target.value)}}
                                            />
                                        </Col>
                                        <Col>
                                            <input
                                                className="form-control"
                                                value={rangemax}
                                                placeholder="Precio maximo"
                                                type="number"
                                                onChange={(e) => {setRangemax(e.target.value)}}
                                            />
                                        </Col>
                                        <Col>
                                            <Button
                                                variant="outline-dark"
                                                onClick={() => {
                                                    filtrar(0);
                                                }}
                                            >
                                                Buscar
                                            </Button>

                                        </Col>
                                    </Row>
                                );
                            default:
                                return (
                                    <input
                                    className="form-control"
                                    value={search}
                                    placeholder="Buscar"
                                    onChange={handleChange}
                                />
                                );
                        }
                    })()}
                    

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
                                    <b> Precio: $ </b> {tab.precio}
                                    <br />
                                </Card.Text>
                               {tab.estado === "Disponible" ? ( 
                                    <>
                                    <Button
                                        variant="dark"
                                        onClick={() => showModal(tab)}
                                    >
                                        Reservar 
                                    </Button>
                                    {"  "} 
                                    <Button variant="dark" onClick={() => showModalRes(tab)} >
                                        Ver Reseñas 
                                    </Button>
                                    </>): 
                                    (
                                    <>
                                    <Button
                                        variant="dark"
                                        onClick={() => showModal(tab)}
                                        disabled
                                    >
                                        Reservar 
                                    </Button>
                                    {"  "} 
                                    <Button variant="dark" onClick={() => showModalRes(tab)}  >
                                        Ver Reseñas 
                                    </Button>
                                    </>)}
                               
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
                    userdata = {props.userdata}
                    updateDashboard = {props.updateDashboard}
                />

                {/* VER SERVICIO */}
                <ModalResenia
                    show={showModalResenia}
                    onHide={() => setShowModalResenia(false)}
                    data={dataAuto}
                    showoption={2}
                    updateDashboard = {props.updateDashboard}
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
