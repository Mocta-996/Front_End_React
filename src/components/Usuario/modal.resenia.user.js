import React from "react";
import { useState, useEffect } from "react";
import { Modal, Card } from "react-bootstrap";
import RatingStart from "../Rating/Start.js";

function ReseniaUser(props) {
    const [dataresenia, setDataResenia] = useState({});

    useEffect(() => {
        setDataResenia(props.data);
        console.log("modaluserreseñaprops",props);
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
                    Reseñas del servicio
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <div className="bodydiv">
                        <Card border="dark">
                            <Card.Header>{dataresenia.usuario}</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <RatingStart stars={dataresenia.calificaicon} />
                                </Card.Title>
                                <Card.Text>{dataresenia.resenia}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
            </Modal.Body>
        </Modal>
    );
}

const resenia = [
    {
        id_resenia: 1,
        usuario: "Juan",
        resenia: "Excelente hotel",
        calificacion: 5,
    },
    {
        id_resenia: 2,
        usuario: "Pedro",
        resenia: "Muy bueno",
        calificacion: 4,
    },
    {
        id_resenia: 3,
        usuario: "Maria",
        resenia: "Muy bueno",
        calificacion: 3.5,
    },
];
export default  ReseniaUser;
