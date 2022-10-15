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

function BuscarHotel(props) {
    const [search, setSearch] = useState("");
    const [hotel, setHotel] = useState([]);
    const [tableHotel, setTableHotel] = useState([]);
    const [radioValue, setRadioValue] = useState("1");
    const [showModalReservar, setShowModalReservar] = useState(false);
    const [showModalResenia,setShowModalResenia] = useState(false);
    const [dataHotel, setDataHotel] = useState({});
    const [rangemin, setRangemin] = useState(0);
    const [rangemax, setRangemax] = useState(1000);
    const [datemin, setDatemin] = useState(dateNow());
    const [datemax, setDatemax] = useState(dateNow());
   
    
    const radios = [
        { name: "Pais", value: "1", variant: "outline-dark" },
        { name: "Ciudad", value: "2", variant: "outline-dark" },
        { name: "Cantidad de Personas", value: "3", variant: "outline-dark" },
        { name: "Rango precios", value: "4", variant: "outline-dark" },
        { name: "Rango de fecha", value: "5", variant: "outline-dark" },
    ];
    const showModal = (data) => {
        setShowModalReservar(true);
        setDataHotel(data);
      
    }

    const showModalRes = (data) => {
        setShowModalResenia(true);
        setDataHotel(data);
      
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
        filtrar(e.target.value);
    };
 
    const filtrar = (terminosearch) => {
        var resultadossearch = tableHotel.filter((elemento) => {
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
            } else if (radioValue === "3") {
                return elemento.capacidad <= terminosearch;
            }
            else if (radioValue === "4") {
                return elemento.precio >= rangemin && elemento.precio <= rangemax;
            }
            else if (radioValue === "5") {
                //handlerSearch();
                /*var date_service = new Date(elemento.fecha_disponibilidad);
                var startDate = new Date(datemin);
                var endDate = new Date( datemax);
                
                if (date_service  >= startDate && date_service  <= endDate) {
                    return elemento;
                }*/
                //setHotel(handlerSearch());
            }
        });
        setHotel(resultadossearch);
    };
   

    const handlerData = async () => {
        try{
            const res= await axios.post(" http://35.239.122.121:4000/api/fulltrip/v1/hotel/rooms",{info:JSON.stringify("")});
            setHotel(res.data.data);
            setTableHotel(res.data.data);
           
          }catch(ex){
            console.log(ex);
            Error();
          }
    };

    const handlerSearch = async () => {
        try{
            const dates = {fecha_inicio:datemin, fecha_final:datemax};
           
            const res= await axios.post(" http://35.239.122.121:4000/api/fulltrip/v1/hotel/rooms",{info:JSON.stringify(dates)});
            return res.data.data;
            setHotel(res.data.data);
           
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
                    Buscar Hotel
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
                                    <input
                                    className="form-control"
                                    value={search}
                                    placeholder="Cantidad de Personas"
                                    type = "number"
                                    onChange={handleChange}
                                />
                                );
                            case "4":
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
                            case "5":
                                return (
                                    <Row>
                                    <Col>
                                        <input
                                            className="form-control"
                                            value={datemin}
                                            placeholder="Precio minimo"
                                            type="date"
                                            onChange={(e) => {setDatemin(e.target.value)}}
                                        />
                                    </Col>
                                    <Col>
                                        <input
                                            className="form-control"
                                            value={datemax}
                                            placeholder="Precio maximo"
                                            type="date"
                                            onChange={(e) => {setDatemax(e.target.value)}}
                                        />
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="outline-dark"
                                            onClick={() => {
                                                handlerSearch();
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
                {hotel.map((tab, index) => (
                    <Col key={index} className ="bodydiv">
                        <Card border="dark">
                            <Card.Img variant="top" src={tab.imagen} />
                            <Card.Body>
                                <Card.Title>{tab.nombre_hotel}</Card.Title>
                                <Card.Text>

                                    {tab.descripcion}
                                    <br />
                                    <b> Capacidad: </b>{" "}
                                    {tab.capacidad} Personas
                                    <br />
                                    <b> Cantidad disponible: </b>{" "}
                                    {tab.cantidad_disponible} Habitaciones
                                    <br />
                                    <b> Precio: </b> {tab.precio}
                                    <br />
                                    <b> Fecha Disponibilidad: </b>{" "}
                                    {tab.fecha_disponibilidad}
                                    <br />
                                    <b> País: </b> {tab.pais}
                                    <br />
                                    <b> Ciudad: </b> {tab.ciudad}
                                    <br />
                               
                                </Card.Text>
                                <Button
                                    variant="dark"
                                    onClick={() => showModal(tab)}
                                >
                                    Reservar 
                                </Button>
                                {"  "} 
                                <Button variant="dark" onClick={() => showModalRes(tab)}>
                                    Ver Reseñas 
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
                    data={dataHotel}
                    showoption={parseInt(radioValue)}
                    userdata = {props.userdata}
                    update = {handlerData}
                    updateDashboard = {props.updateDashboard}
                />

                {/* VER SERVICIO */}
                <ModalResenia
                    show={showModalResenia}
                    onHide={() => setShowModalResenia(false)}
                    data={dataHotel}
                    showoption={parseInt(radioValue)}
                    updateDashboard = {props.updateDashboard}
                />
            </Modal.Body>
        </Modal>
    );
}
const data = [
    {
        cantidad_disponible: 12,
        descripcion: "Habitación doble1",
        fecha_disponibilidad: "2021-10-10",
        id_habitacion: 1,
        imagen: "../../images/image1.jpg",
        numero: 1,
        precio: 100,
        pais: "Colombia",
        ciudad: "Bogota",
    },
    {
        cantidad_disponible: 1,
        descripcion: "Habitación doble2",
        fecha_disponibilidad: "2021-10-10",
        id_habitacion: 1,
        imagen: "../../images/image1.jpg",
        numero: 1,
        precio: 100,
        pais: "Ecuador",
        ciudad: "Quito",
    },
    {
        cantidad_disponible: 3,
        descripcion: "Habitación doble",
        fecha_disponibilidad: "2021-10-10",
        id_habitacion: 1,
        imagen: "../../images/image1.jpg",
        numero: 1,
        precio: 100,
        pais: "Guatemala",
        ciudad: "Guatemala",
    },
    {
        cantidad_disponible: 10,
        descripcion: "Habitación doble",
        fecha_disponibilidad: "2021-10-10",
        hotel_id: 1,
        imagen: "../../images/image1.jpg",
        numero: 1,
        precio: 100,
        pais: "Honduras",
        ciudad: "Tegucigalpa",
    },
];


const dateNow =() => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    parseInt(dt) < 10 ? (dt = "0" + dt) : (dt = dt);
    return year + "-" + month + "-" + dt;
}
const Error = () => {
    Swal.fire("Error","Ocurrio un problema, intente más tarde", "error");
};
export default BuscarHotel;
