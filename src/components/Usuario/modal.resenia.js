import React from "react";
import { useState, useEffect } from "react";
import {
    Modal,
    Button,
    Form,
    Col
} from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import RatingStart from "../Rating/Start.js";

function AgregarResenia(props) {
    const [option, setOption] = useState(0);
    
    const [dataRating, setDataRating] = useState({
        calificacion: 0,
        comentario: "",
        id_usuario: "",
        id_service: "",
        contrasenia: "",
        tipoServicio: 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(props);
        dataRating.id_service= props.dataService;
        dataRating.id_usuario= props.userdata.id_user;
        dataRating.tipoServicio= props.option;
        console.log(dataRating);
    };

    /*useEffect(() => {
        setOption(props.option            );
        console.log(props);

    }, []);*/

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
                    Agregar Reseña
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="calificacion">
                        <Form.Label>Ingrese una Calificación 0-5 </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={dataRating.calificacion}
                            onChange={(e) =>
                                setDataRating({
                                    ...dataRating,
                                    calificacion: parseInt(e.target.value),
                                })
                            }
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            <RatingStart stars={dataRating.calificacion} />
                        </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="pass2">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese un comentario"
                            onChange={(e) =>
                                setDataRating({
                                    ...dataRating,
                                    comentario: e.target.value,
                                })
                            }
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="pass1">
                        <Form.Label>Constraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirmar constraseña"
                            onChange={(e) =>
                                setDataRating({
                                    ...dataRating,
                                    contrasenia: e.target.value,
                                })
                            }
                            required
                        />
                    </Form.Group>

                    <Button variant="secondary" onClick={() => props.onHide()}>
                        Cancelar
                    </Button>
                    {"   "}
                    <Button
                        variant="default"
                        type="submit"
                        className="bodybutton"
                    >
                        Agregar Reseña
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


const showAlert = (title,msg,icon) => {
    Swal.fire(
        title,msg,icon
      )
};

export default AgregarResenia;
