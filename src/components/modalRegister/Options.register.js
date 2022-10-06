import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from 'react-bootstrap/Spinner';
import "./Options.register.css";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

function OptionsRegister(props) {
    const [option, setOption] = useState(0);
    const [showform, setShowform] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertSucces, setShowAlertSucces] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const [userdata, setUserdata] = useState({
        name: "",
        user: "",
        date: "",
        email: "",
        pass1: "",
        pass2: "",
        rol:1
    });

    const [hoteldata, setHoteldata] = useState({
        name: "",
        country: "",
        city: "",
        email: "",
        pass: "",
        rol:2
    });

    const [rentalsdata, setRentalsdata] = useState({
        name: "",
        country: "",
        city: "",
        email: "",
        pass: "",
        rol:3
    });

    const [airlinedata, setAirlinedata] = useState({
        name: "",
        country: "",
        city: "",
        email: "",
        pass: "",
        rol:4
    });
    const showForm = (e) => {
        setOption(e);
        setShowform(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        switch (option) {
            case 1:
                console.log(userdata);
                // verificar que las contraseñas sean iguales
                if (userdata.pass1 !== userdata.pass2) {
                    setShowAlert(true);
                    setTimeout(function(){
                        setShowAlert(false);
                    }, 3000);
                    return;
                }
                // registrar usuario
                const data=new FormData()
                data.append("info",JSON.stringify(userdata))
            
                try{
                  const res=axios.post("http://35.239.122.121:4000/api/fulltrip/v1/main/registro",data);
                  console.log(res)
                    setShowAlertSucces(true);
                    setTimeout(function(){
                        setShowAlertSucces(false);
                    }, 2000);
                    props.onHide();
                    //localStorage.setItem("user",JSON.stringify(userdata));
                    props.update();
                    navigate("/dashboard");

                }catch(ex){
                  console.log(ex)
                }

                
                

                break;
            case 2:
                console.log(hoteldata);
                setShowAlertSucces(true);
                setTimeout(function(){
                    setShowAlertSucces(false);
                }, 2000);
                // code block
                props.onHide();
                localStorage.setItem("user",JSON.stringify(hoteldata));
                props.update();
                navigate("/dashboard");

                // code block
                break;
            case 3:
                console.log(rentalsdata);
                setShowAlertSucces(true);
                setTimeout(function(){
                    setShowAlertSucces(false);
                }, 2000);
                // code block
                props.onHide();
                localStorage.setItem("user",JSON.stringify(rentalsdata));
                props.update();
                navigate("/dashboard");
                
                break;
            case 4:
                console.log(airlinedata);
                setShowAlertSucces(true);
                setTimeout(function(){
                    setShowAlertSucces(false);
                }, 2000);
                 // code block
                 props.onHide();
                 localStorage.setItem("user",JSON.stringify(airlinedata));
                 props.update();
                 navigate("/dashboard");
                break;
            default:
                setShowError(true);
            // code block
        }
    };

    return (
        <Modal  size="md"  aria-labelledby="contained-modal-title-vcenter"  centered show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton className="bodymodal">
                <Modal.Title id="contained-modal-title-vcenter ">
                    Registrarse
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!showform ? (
                    <ListGroup defaultActiveKey="#link1" variant="flush">
                        {options.map(({ title, icon, id }) => (
                            <ListGroup.Item
                                key={id}
                                action
                                onClick={() => showForm(id)}
                            >
                                <Row>
                                    <Col xs={2} md={2} lg={2}>
                                        <ion-icon
                                            size="large"
                                            name={icon}
                                        ></ion-icon>
                                    </Col>
                                    <Col xs={9} md={9} lg={9}>
                                        {title}
                                    </Col>
                                    <Col xs={1} md={1} lg={1}>
                                        <ion-icon
                                            size="large"
                                            name="chevron-forward"
                                        ></ion-icon>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    (() => {
                        switch (option) {
                            case 1:
                                return (
                                    <>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="name"
                                            >
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nombre Completo"
                                                    onChange={(e) =>
                                                        setUserdata({
                                                            ...userdata,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="user"
                                            >
                                                <Form.Label>Usuario</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nombre de Usuario"
                                                    onChange={(e) =>
                                                        setUserdata({
                                                            ...userdata,
                                                            user: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="date"
                                            >
                                                <Form.Label>
                                                    Fecha de nacimiento
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    onChange={(e) =>
                                                        setUserdata({
                                                            ...userdata,
                                                            date: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="email"
                                            >
                                                <Form.Label>
                                                    Correo electrónico
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Correo electrónico"
                                                    onChange={(e) =>
                                                        setUserdata({
                                                            ...userdata,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="pass1"
                                            >
                                                <Form.Label>
                                                    Constraseña
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Constraseña"
                                                    onChange={(e) =>
                                                        setUserdata({
                                                            ...userdata,
                                                            pass1: e.target
                                                                .value,
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
                                                    Confirmar Constraseña
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Confirmar Constraseña"
                                                    onChange={(e) =>
                                                        setUserdata({
                                                            ...userdata,
                                                            pass2: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            {showAlert && (
                                                <Alert
                                                    variant="danger"
                                                    onClose={() =>
                                                        setShowAlert(false)
                                                    }
                                                    dismissible
                                                >
                                                    Error, las contraseñas no
                                                    coinciden
                                                </Alert>
                                            )}

                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    setShowform(false)
                                                }
                                            >
                                                Regresar
                                            </Button>
                                            {"   "}
                                            <Button
                                                variant="default"
                                                type="submit"
                                                className="bodybutton"
                                            >
                                                Ingresar
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
                                                controlId="name"
                                            >
                                                <Form.Label>
                                                    Nombre del Hotel
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nombre del hotel"
                                                    onChange={(e) =>
                                                        setHoteldata({
                                                            ...hoteldata,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="country"
                                            >
                                                <Form.Label>Pais</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nombre de Usuario"
                                                    onChange={(e) =>
                                                        setHoteldata({
                                                            ...hoteldata,
                                                            country:
                                                                e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="city"
                                            >
                                                <Form.Label>Ciudad</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Ciudad"
                                                    onChange={(e) =>
                                                        setHoteldata({
                                                            ...hoteldata,
                                                            city: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="email"
                                            >
                                                <Form.Label>
                                                    Correo electrónico
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Correo electrónico"
                                                    onChange={(e) =>
                                                        setHoteldata({
                                                            ...hoteldata,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="pass1"
                                            >
                                                <Form.Label>
                                                    Constraseña
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Constraseña"
                                                    onChange={(e) =>
                                                        setHoteldata({
                                                            ...hoteldata,
                                                            pass: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    setShowform(false)
                                                }
                                            >
                                                Regresar
                                            </Button>
                                            {"   "}
                                            <Button
                                                variant="default"
                                                type="submit"
                                                className="bodybutton"
                                            >
                                                Ingresar
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
                                                controlId="name"
                                            >
                                                <Form.Label>
                                                    Nombre Alquiler de Vehiculos
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nombre Alquiler de Vehiculos"
                                                    onChange={(e) =>
                                                        setRentalsdata({
                                                            ...rentalsdata,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="country"
                                            >
                                                <Form.Label>Pais</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nombre de Usuario"
                                                    onChange={(e) =>
                                                        setRentalsdata({
                                                            ...rentalsdata,
                                                            country:
                                                                e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="city"
                                            >
                                                <Form.Label>Ciudad</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Ciudad"
                                                    onChange={(e) =>
                                                        setRentalsdata({
                                                            ...rentalsdata,
                                                            city: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="email"
                                            >
                                                <Form.Label>
                                                    Correo electrónico
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Correo electrónico"
                                                    onChange={(e) =>
                                                        setRentalsdata({
                                                            ...rentalsdata,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="pass1"
                                            >
                                                <Form.Label>
                                                    Constraseña
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Constraseña"
                                                    onChange={(e) =>
                                                        setRentalsdata({
                                                            ...rentalsdata,
                                                            pass: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    setShowform(false)
                                                }
                                            >
                                                Regresar
                                            </Button>
                                            {"   "}
                                            <Button
                                                variant="default"
                                                type="submit"
                                                className="bodybutton"
                                            >
                                                Ingresar
                                            </Button>
                                        </Form>
                                    </>
                                );
                            case 4:
                                return (
                                    <>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="name"
                                            >
                                                <Form.Label>
                                                    Nombre Aerolínea
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nombre Aerolínea"
                                                    onChange={(e) =>
                                                        setAirlinedata({
                                                            ...airlinedata,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="country"
                                            >
                                                <Form.Label>Pais</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Pais"
                                                    onChange={(e) =>
                                                        setAirlinedata({
                                                            ...airlinedata,
                                                            country:
                                                                e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="city"
                                            >
                                                <Form.Label>Ciudad</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Ciudad"
                                                    onChange={(e) =>
                                                        setAirlinedata({
                                                            ...airlinedata,
                                                            city: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="email"
                                            >
                                                <Form.Label>
                                                    Correo electrónico
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Correo electrónico"
                                                    onChange={(e) =>
                                                        setAirlinedata({
                                                            ...airlinedata,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="pass1"
                                            >
                                                <Form.Label>
                                                    Constraseña
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Constraseña"
                                                    onChange={(e) =>
                                                        setAirlinedata({
                                                            ...airlinedata,
                                                            pass: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Form.Group>

                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    setShowform(false)
                                                }
                                            >
                                                Regresar
                                            </Button>
                                            {"   "}
                                            <Button
                                                variant="default"
                                                type="submit"
                                                className="bodybutton"
                                            >
                                                Ingresar
                                            </Button>
                                        </Form>
                                    </>
                                );
                            default:
                                return null;
                        }
                    })()
                )}
                {showAlertSucces && (
                    <Alert
                        variant="success"
                        className ="bodyAlert"
                        onClose={() => setShowAlertSucces(false)}
                        dismissible
                    >
                    Registro éxitoso, espere un momento por favor...
                        
                    <Spinner animation="grow" variant="success"  />
                    </Alert>
                )}
                {showError && (
                    <Alert
                        variant="success"
                        className ="bodyAlert"
                        onClose={() => setShowError(false)}
                        dismissible
                    >
                    Ocurrio un Error, intente más tarde...
                    </Alert>
                )}
            </Modal.Body>
        </Modal>
    );
}

const options = [
    {
        id: 1,
        title: "Usuario",
        icon: "person",
    },
    {
        id: 2,
        title: "Hotel",
        icon: "bed",
    },
    {
        id: 3,
        title: "Alquiler de vehículos",
        icon: "car-sport",
    },
    {
        id: 4,
        title: "Aerolinea",
        icon: "airplane",
    },
];






  export default OptionsRegister;
