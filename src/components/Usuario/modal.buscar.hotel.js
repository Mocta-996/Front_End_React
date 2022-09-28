import React from "react";
import { useState } from "react";
import {
    Modal,
    Col,
    Row,
    Button,
    ButtonGroup,
    ToggleButton,
} from "react-bootstrap";

function BuscarHotel(props) {
    const [search, setSearch] = useState("");
    const [hotel, setHotel] = useState([]);
    const [tableHotel, setTableHotel] = useState([]);
    const [radioValue, setRadioValue] = useState("1");

    const radios = [
        { name: "Pais", value: "1", variant: "outline-dark" },
        { name: "Ciudad", value: "2", variant: "outline-dark" },
        { name: "Cantidad de Personas", value: "3", variant: "outline-dark" },
        { name: "Rango precios", value: "4", variant: "outline-dark" },
        { name: "Rango de fecha", value: "5", variant: "outline-dark" },
    ];

    /*
    const handleSubmit = async (e) => {
        e.preventDefault();
        // agregar id hotel
        room.hotel_id = props.hotel_id;
        room.imagen = image.preview;
        console.log(room);
    };

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setImage(img);
    };*/
    const handleChange = (e) => {
        setSearch(e.target.value);
        filtrar(e.target.value);
    };

    const filtrar = (terminosearch) => {
        var resultadossearch = tableHotel.filter((elemento) => {
            /*if (radioValue === '1') {
                if (elemento.marca.toLowerCase().includes(terminosearch.toLowerCase())) {
                    return elemento;
                }
            } else if (radioValue === '2') {
                if (elemento.modelo.toLowerCase().includes(terminosearch.toLowerCase())) {
                    return elemento;
                }
            }
            else {
                if (elemento.color.toLowerCase().includes(terminosearch.toLowerCase())) {
                    return elemento;
                }
            }*/
        });
        //console.log(resultadossearch);
        setHotel(resultadossearch);
    };

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
                <Col xs lg="2">{" "}</Col>
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
            <Modal.Body></Modal.Body>
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
    },
    {
        cantidad_disponible: 1,
        descripcion: "Habitación doble2",
        fecha_disponibilidad: "2021-10-10",
        id_habitacion: 1,
        imagen: "../../images/image1.jpg",
        numero: 1,
        precio: 100,
        pais:"Ecuador",
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
    },
];

export default BuscarHotel;
