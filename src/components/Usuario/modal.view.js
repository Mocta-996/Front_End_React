import React from "react";
import { useState, useEffect } from "react";
import {
    Modal,
    Card
} from "react-bootstrap";
import RatingStart from "../Rating/Start.js";

function Resenia(props) {
    const [option, setOption] = useState(0);
    const [dataHotel, setDataHotel] = useState({});
    const [dataresenia, setDataResenia] = useState([]);

    useEffect(() => {
        console.log(props);
        setOption(props.showoption);
        setDataResenia(resenia);
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
                                       Reseñas
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
                                    <h2> Habitacion 1</h2>
                                    {dataresenia.map((res, index) => (
                                       <div className="bodydiv" key={index}>
                                        <Card  border="dark" >
                                            <Card.Header>
                                                {res.usuario}
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title>
                                                <RatingStart stars={res.calificacion} />
                                                </Card.Title>
                                                <Card.Text>
                                                    {res.resenia}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        </div>
                                    ))}
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
export default Resenia;
