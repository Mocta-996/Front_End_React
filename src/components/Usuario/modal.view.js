import React from "react";
import { useState, useEffect } from "react";
import { Modal, Card } from "react-bootstrap";
import RatingStart from "../Rating/Start.js";

function Resenia(props) {
    const [option, setOption] = useState(0);
    const [dataHotel, setDataHotel] = useState({});
    const [dataresenia, setDataResenia] = useState([]);

    useEffect(() => {
        setOption(props.showoption);
        setDataResenia(resenia);
        handlerData();
        console.log(props);
    }, []);

    const handlerData = async () => {
        if (option == 1) {
            try {
                const id_ = { id_habitacion: props.data.id_habitacion };
                console.log(id_);
                //const res= await axios.post("http://35.239.122.121:4000/api/fulltrip/v1/hotel/getData",{info:JSON.stringify(id_)});
                //setDataHotel(res.data.data);
            } catch (ex) {
                console.log(ex);
                Error();
            }
        }
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
                            return (
                                <>
                                    <Modal.Title id="contained-modal-title-vcenter ">
                                        Reseñas
                                    </Modal.Title>
                                </>
                            );
                    }
                })()}
            </Modal.Header>

            <Modal.Body>
                {(() => {
                    switch (option) {
                        case 1:
                            return (
                                <>
                                    <Card border="dark">
                                        <Card.Img
                                            variant="top"
                                            src={props.data.imagen}
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {props.data.nombre_hotel}
                                            </Card.Title>
                                            <Card.Text>
                                                <b> Habitación: </b> <br />
                                                {props.data.descripcion}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    {dataresenia.map((res, index) => (
                                        <div className="bodydiv" key={index}>
                                            <Card border="dark">
                                                <Card.Header>
                                                    {res.usuario}
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>
                                                        <RatingStart
                                                            stars={
                                                                res.calificacion
                                                            }
                                                        />
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
                        case 2:
                            return (
                                <>
                                    <Card border="dark">
                                        <Card.Img
                                            variant="top"
                                            src={props.data.imagen}
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {props.data.marca} -
                                                {props.data.modelo}
                                            </Card.Title>
                                            <Card.Text>
                                                <b> Estado: </b> <br />
                                                {props.data.estado}
                                                <br />
                                                <b> Precio: $ </b>
                                                {props.data.precio}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    {dataresenia.map((res, index) => (
                                        <div className="bodydiv" key={index}>
                                            <Card border="dark">
                                                <Card.Header>
                                                    {res.usuario}
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>
                                                        <RatingStart
                                                            stars={
                                                                res.calificacion
                                                            }
                                                        />
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
                        case 3:
                            return (
                                <>
                                    <Card border="dark">
                                        <Card.Img
                                            variant="top"
                                            src={props.data.imagen}
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {props.data.nombre_aerolinea} 
                                            </Card.Title>
                                            <Card.Text>
                                                <b> Destino: </b> <br />
                                                {props.data.Destino}
                                                <br />
                                                <b> Precio: $ </b>
                                                {props.data.precio}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    {dataresenia.map((res, index) => (
                                        <div className="bodydiv" key={index}>
                                            <Card border="dark">
                                                <Card.Header>
                                                    {res.usuario}
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>
                                                        <RatingStart
                                                            stars={
                                                                res.calificacion
                                                            }
                                                        />
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
