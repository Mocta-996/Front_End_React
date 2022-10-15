import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./Auto.css";
import axios from "axios";
import Swal from "sweetalert2";


function AddRental(props) {
    const [auto, setAuto] = useState({
        marca: "",
        placa: "",
        modelo: "",
        precio: "",
        rental_id: "",
        imagen: null,
    });
    const [image, setImage] = useState({ preview: "", data: "" });

    const [showError, setShowError] = useState(false);
    const [showAlertSucces, setShowAlertSucces] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // agregar id hotel
        auto.rental_id = props.rental_id;
        auto.imagen = image.data;

        const add = new FormData();
        add.append("imagen", image.data);
        add.append("info", JSON.stringify(auto));

        try {
       
            const res = await axios.post(
                "http://35.239.122.121:4000/api/fulltrip/v1/rentaautos/addcar",
                add
            );
            swAlert("Exito","Automóvil agregada con exito","success");
            props.update();
            props.onHide();
        } catch (ex) {
            swAlert("Error","Error al agregar Automóvil, intente más tarde","error");
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
                    Agregar Automóvil
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="marca">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la marca"
                                onChange={(e) =>
                                    setAuto({
                                        ...auto,
                                        marca: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="placa">
                            <Form.Label>Placa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la placa"
                                onChange={(e) =>
                                    setAuto({
                                        ...auto,
                                        placa: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="modelo">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el modelo"
                                onChange={(e) =>
                                    setAuto({
                                        ...auto,
                                        modelo: e.target.value,
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
                                    setAuto({
                                        ...auto,
                                        precio: e.target.value,
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
                    El  auto se ha agregado correctamente 
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

export default AddRental;
