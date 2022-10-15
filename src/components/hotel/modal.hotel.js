import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./Hotel.css";
import axios from "axios";
import Swal from "sweetalert2";


function AddRoom(props) {
    const [room, setRoom] = useState({
        capacidad: "",
        cantidad_disponible: "",
        precio: "",
        fecha_disponibilidad: "",
        descripcion: "",
        hotel_id: "",
    });
    const [image, setImage] = useState({ preview: "", data: "" });
    const [showError, setShowError] = useState(false);
    const [showAlertSucces, setShowAlertSucces] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // agregar id hotel
        room.hotel_id = props.hotel_id;
     
        const add = new FormData();
        add.append("imagen", image.data);
        add.append("info", JSON.stringify(room));

        try {
          
            const res = await axios.post(
                "http://35.239.122.121:4000/api/fulltrip/v1/hotel/addRoom",
                add
            );
           
            swAlert("Exito","Habitación agregada con exito","success");
            props.update();
            props.onHide();
        } catch (ex) {
            console.log(ex);
            swAlert("Error","Error al agregar habitación, intente más tarde","error");
            props.update();
            props.onHide();
        }
    };

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setImage(img);
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
                    Agregar habitación
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="numero">
                            <Form.Label>Capacidad de habitación</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) =>
                                    setRoom({
                                        ...room,
                                        capacidad: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="disponible">
                            <Form.Label>Cantidad disponible</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="0"
                                onChange={(e) =>
                                    setRoom({
                                        ...room,
                                        cantidad_disponible: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Fecha de disponibilidad</Form.Label>
                            <Form.Control
                                type="date"
                                onChange={(e) =>
                                    setRoom({
                                        ...room,
                                        fecha_disponibilidad: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="precio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="0.00"
                                onChange={(e) =>
                                    setRoom({
                                        ...room,
                                        precio: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Breve descripción de la habitación"
                                onChange={(e) =>
                                    setRoom({
                                        ...room,
                                        descripcion: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="file">
                            <Form.Label>Agregar foto</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="file"
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="default"
                            type="submit"
                            className="bodybutton"
                        >
                            Ingresar
                        </Button>
                    </Form>
                </>
                <Row>
                    <Col xs={2} md={4}></Col>
                    <Col xs={8} md={4}>
                        {image.preview && (
                            <img src={image.preview} width="100" height="100" />
                        )}
                    </Col>
                    <Col xs={2} md={4}></Col>
                </Row>
            </Modal.Body>
            {showAlertSucces && (
                <Alert
                    variant="success"
                    className="bodyAlert"
                    onClose={() => setShowAlertSucces(false)}
                    dismissible
                >
                    Se agrego la habitación correctamente
                </Alert>
            )}
            {showError && (
                <Alert
                    variant="success"
                    className="bodyAlert"
                    onClose={() => setShowError(false)}
                    dismissible
                >
                    Ocurrio un Error, intente más tarde...
                </Alert>
            )}
        </Modal>
    );
}

const swAlert = (header,msg,icon) => {
    Swal.fire(header,msg,icon);
};
export default AddRoom;
