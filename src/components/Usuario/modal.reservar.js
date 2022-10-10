import React from "react";
import { useState, useEffect } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

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

    const [dataAuto, setDataAuto] = useState({
        contrasenia: "",
        id_usuario: "",
        auto_id: "",
        startDate: "",
        endDate: "",
    });

    const [dataVuelo, setDataVuelo] = useState({
        usuario: "",
        contrasenia: "",
        id_usuario: "",
        vuelo_id: "",
        cantidad_asientos: "",
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (option === 1) {
            // verficar fecha de disponibilidad
            var date_service = new Date(props.data.fecha_disponibilidad);
            var startDate = new Date(dataHotel.startDate);
            var endDate = new Date(dataHotel.endDate);
            if (
                startDate > date_service ||
                endDate > date_service ||
                startDate > endDate
            ) {
                showAlert(
                    "Error",
                    "Fecha no disponible, ingrese una fecha valida",
                    "error"
                );
                return;
            }
            // verificar el usuario

            if (dataHotel.usuario != props.userdata.user) {
                showAlert(
                    "Error",
                    "Usuario no valido, ingrese su usuario",
                    "error"
                );
                return;
            } else if (
                dataHotel.cantidad <= 0 ||
                dataHotel.cantidad > props.data.cantidad_disponible
            ) {
                showAlert(
                    "Error",
                    "Cantidad de habitaciones no valida",
                    "error"
                );
                return;
            }
            dataHotel.id_usuario = props.userdata.id_user;
            dataHotel.id_habitacion = props.data.id_habitacion;
            console.log(dataHotel);

            try {
                const res = await axios.post(
                    "http://35.239.122.121:4000/api/fulltrip/v1/hotel/reserveRoom",
                    { info: JSON.stringify(dataHotel) }
                );
                showAlert(
                    "Reservado",
                    "Has reservado una habitación",
                    "success"
                );
                props.onHide();
                console.log(res);
            } catch (ex) {
                console.log(ex);
                showAlert("Error", ex.response.data.msg, "error");
            }
        }else if (option == 2){
            // verficar fecha de disponibilidad

            var startDate = new Date(dataAuto.startDate);
            var endDate = new Date(dataAuto.endDate);
            if ( startDate > endDate) {
                showAlert(
                    "Error",
                    "Fecha no disponible, ingrese una fecha valida",
                    "error"
                );
                return;
            }
            // verificar el usuario
            dataAuto.id_usuario = props.userdata.id_user;
            dataAuto.auto_id= props.data.auto_id;
            console.log(dataAuto);

            try {
                /*const res = await axios.post(
                    "http://35.239.122.121:4000/api/fulltrip/v1/hotel/reserveRoom",
                    { info: JSON.stringify(dataHotel) }
                );*/
                showAlert( "Reservado","Alquilaste un auto",  "success");
                props.onHide();
                //console.log(res);
            } catch (ex) {
                console.log(ex);
                showAlert("Error", ex.response.data.msg, "error");
            }
        }
        else if (option == 3){
            dataVuelo.id_usuario = props.userdata.id_user;
            dataVuelo.vuelo_id= props.data.vuelo_id;
            // verificar el usuario
            if ( dataVuelo.usuario !=  props.userdata.user) {
                showAlert(
                    "Error",
                    "Usuario no valido, ingrese su usuario",
                    "error"
                );
                return;
            }else if (dataVuelo.cantidad_asientos <= 0 || dataVuelo.cantidad_asientos > props.data.Disponibles)
            {
                showAlert(
                    "Error",
                    "Cantidad de asientos no valida",
                    "error"
                );
                return;
            }
            console.log(dataVuelo);
            
            try {
                /*const res = await axios.post(
                    "http://35.239.122.121:4000/api/fulltrip/v1/hotel/reserveRoom",
                    { info: JSON.stringify(dataHotel) }
                );*/
                showAlert( "Reservado","Alquilaste un auto",  "success");
                props.onHide();
                //console.log(res);
            } catch (ex) {
                console.log(ex);
                showAlert("Error", ex.response.data.msg, "error");
            }
            
        
        }
    };

    useEffect(() => {
        setOption(props.showoption);
        console.log("porps",props)
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
                            case 3:
                                return (
                                    <>
                                        <Modal.Title id="contained-modal-title-vcenter ">
                                            Reservar Vuelo
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

                                        <Form.Group
                                            className="mb-3"
                                            controlId="stardate"
                                        >
                                            <Form.Label>
                                                Fecha de Inicio de Reservación
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                onChange={(e) =>
                                                    setDataHotel({
                                                        ...dataHotel,
                                                        startDate:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="enddate"
                                        >
                                            <Form.Label>
                                                Fecha de Final de Reservación
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                onChange={(e) =>
                                                    setDataHotel({
                                                        ...dataHotel,
                                                        endDate: e.target.value,
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
                        case 2:
                            return (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="pass1"
                                    >
                                        <Form.Label>Constraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirmar constraseña"
                                            onChange={(e) =>
                                                setDataAuto({
                                                    ...dataAuto,
                                                    contrasenia: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="stardate"
                                    >
                                        <Form.Label>
                                            Fecha de Inicio de Alquiler
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            onChange={(e) =>
                                                setDataAuto({
                                                    ...dataAuto,
                                                    startDate: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="enddate"
                                    >
                                        <Form.Label>
                                            Fecha de Final de Alquiler
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            onChange={(e) =>
                                                setDataAuto({
                                                    ...dataAuto,
                                                    endDate: e.target.value,
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
                        case 3:
                            return (
                                <>
                                    <Form onSubmit={handleSubmit}>
                                    <Form.Group
                                            className="mb-3"
                                            controlId="stardate"
                                        >
                                            <Form.Label>
                                                Usuario
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese su usuario"
                                                onChange={(e) =>
                                                    setDataVuelo({
                                                        ...dataVuelo,
                                                        usuario: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Form.Group>
    
                                        <Form.Group
                                            className="mb-3"
                                            controlId="enddate"
                                        >
                                            <Form.Label>
                                                Cantidad de Boletos
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Cantidad de bolestos a comprar"
                                                onChange={(e) =>
                                                    setDataVuelo({
                                                        ...dataVuelo,
                                                        cantidad_asientos: e.target.value,
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
                                                    setDataVuelo({
                                                        ...dataVuelo,
                                                        contrasenia: e.target.value,
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


const showAlert = (title,msg,icon) => {
    Swal.fire(
        title,msg,icon
      )
};

export default Reservar;
