import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Options.login.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

function OptionsLogin(props) {
    const [option, setOption] = useState(0);
    const [showform, setShowform] = useState(false);
    const [userdata, setUserdata] = useState({ user: "", pass: "",rol:0 });
    const navigate = useNavigate();

    const showForm = (e) => {
        setOption(e);
        setShowform(true);
        setUserdata({
            ...userdata,
            rol:e,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
         
            const res= await axios.post(" http://35.239.122.121:4000/api/fulltrip/v1/main/login",{info:JSON.stringify(userdata)});
            const {data} = res
            props.onHide();
            localStorage.setItem("user",JSON.stringify(data.data));
            props.update();
            navigate("/dashboard");
          }catch(ex){
          
            const {status, msg} = ex.response.data;
            if(!status){
                Error(msg);
            } 
            else {
                Error("Ha ocurrido un error, intente mas tarde");
            }
          }
    };

    return (
        <Modal
        show={props.show} onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="bodymodal">
                <Modal.Title id="contained-modal-title-vcenter ">
                    Iniciar Sesión
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
                    <Form onSubmit={handleSubmit}>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Ingrese su Usuario o Correo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="name@example.com/Usuario"
                                autoFocus
                                onChange={(e) =>
                                    setUserdata({
                                        ...userdata,
                                        user: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Ingrese su contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    setUserdata({
                                        ...userdata,
                                        pass: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="secondary"
                            onClick={() => setShowform(false)}
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

const Error = (msg) => {
    Swal.fire("Error",msg, "error");
};
export default OptionsLogin;
