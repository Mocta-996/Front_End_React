import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./Aerolinea.css";
import axios from "axios";
import Swal from "sweetalert2";

function AddVuelo(props) {
    const [vuelo, setVuelo] = useState({
        fecha_vuelo: "",
        destino_vuelo: "",
        cantidad_disponible: "",
        precio: "",
        tipo_vuelo: "",
        aerolinea_id: "",
        imagen: null,
    });
    const [image, setImage] = useState({ preview: "", data: "" });

    const [showError, setShowError] = useState(false);
    const [showAlertSucces, setShowAlertSucces] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // agregar id hotel
        vuelo.aerolinea_id = props.airline_id;
        vuelo.imagen = image.data;
        console.log(vuelo);
        const add = new FormData();
        add.append("imagen", image.data);
        add.append("info", JSON.stringify(vuelo));

        try {
            console.log(add);
            const res = await axios.post(
                "http://35.239.122.121:4000/api/fulltrip/v1/aerolinea/addFlight",
                add
            );
            console.log(res);
            swAlert("Exito","Vuelo agregado con exito","success");
            props.update();
            props.onHide();
        } catch (ex) {
            console.log(ex);
            swAlert("Error","Error al agregar Vuelo, intente más tarde","error");
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
                    Agregar Vuelo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Fecha de vuelo</Form.Label>
                            <Form.Control
                                type="date"
                                onChange={(e) =>
                                    setVuelo({
                                        ...vuelo,
                                        fecha_vuelo: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="destino">
                            <Form.Label>Destino </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el destino"
                                onChange={(e) =>
                                    setVuelo({
                                        ...vuelo,
                                        destino_vuelo: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cantidad">
                            <Form.Label>Cantidad disponible</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese la cantidad"
                                onChange={(e) =>
                                    setVuelo({
                                        ...vuelo,
                                        cantidad_disponible: e.target.value,
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
                                    setVuelo({
                                        ...vuelo,
                                        precio: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="tipo">
                            <Form.Label>Tipo de Vuelo </Form.Label>
                            <div  className="mb-3">
                                <Form.Check
                                    inline
                                    label="Ida"
                                    type="radio"
                                    name="group1"
                                    id="inline-radio-1"
                                    value = "Ida"
                                    onChange={(e) =>
                                        setVuelo({
                                            ...vuelo,
                                            tipo_vuelo: e.target.value,
                                        })
                                    }
                                />
                                <Form.Check
                                    inline
                                    label="Ida y vuelta"
                                    type="radio"
                                    name="group1"
                                    id="inline-radio-2"
                                    value = "Ida y vuelta"
                                    onChange={(e) =>
                                        setVuelo({
                                            ...vuelo,
                                            tipo_vuelo: e.target.value,
                                        })
                                    }
                                />
                            </div>
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
                    El auto se ha agregado correctamente
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
export default AddVuelo;
