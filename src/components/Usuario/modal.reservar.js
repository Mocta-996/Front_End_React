import React from "react";
import { useState, useEffect } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import Swal from "sweetalert2";

function Reservar(props) {
    const [option, setOption] = useState(0);
    const [dataHotel, setDataHotel] = useState({
        usuario: "",
        cantidad: 0,
        contrasenia: "",
        id_usuario: "",
        id_habitacion: "",
        startDate: "",
        endDate: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hotel reservado");
        showAlert();
    };

    useEffect(() => {
        console.log(props);
        setOption(props.showoption);
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
                {(() => {
                    switch (option) {
                        case 1:
                            return (
                                <>
                                    <Modal.Title id="contained-modal-title-vcenter ">
                                        Reservar Habitacion
                                    </Modal.Title>
                                </>
                            );
                        case 2:
                            return (
                                <>
                                    <Modal.Title id="contained-modal-title-vcenter ">
                                        Reservar Automóvil
                                    </Modal.Title>
                                </>
                            );
                        default:
                            return null;
                    }
                })()}
            </Modal.Header>

            <Modal.Body>
                {(() => {
                    switch (option) {
                        case 1:
                            return (
                                <>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="name"
                                        >
                                            <Form.Label>Usuario</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese su usuario"
                                                onChange={(e) =>
                                                    setDataHotel({
                                                        ...dataHotel,
                                                        usuario: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="pass1"
                                        >
                                            <Form.Label>Constraseña</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirmar constraseña"
                                                onChange={(e) =>
                                                    setDataHotel({
                                                        ...dataHotel,
                                                        contrasenia:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="pass2"
                                        >
                                            <Form.Label>
                                                Cantidad de Habitaciónes
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                onChange={(e) =>
                                                    setDataHotel({
                                                        ...dataHotel,
                                                        cantidad:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Form.Group>
                                        <Button
                                            variant="secondary"
                                            onClick={() => props.onHide()}
                                        >
                                            Cancelar
                                        </Button>
                                        {"   "}
                                        <Button
                                            variant="default"
                                            type="submit"
                                            className="bodybutton"
                                        >
                                            Reservar
                                        </Button>
                                    </Form>
                                </>
                            );
                        default:
                            return null;
                    }
                })()}
            </Modal.Body>
        </Modal>
    );
}


const showAlert = (e) => {
    Swal.fire(
        "Reservado!",
        'Habitación reservado correctamente',
        'Success'
      )
};

export default Reservar;
