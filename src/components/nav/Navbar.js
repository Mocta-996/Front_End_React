import React from "react";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import "./Navbar.css";
import logonav from "../../images/logonav2.png";
import OptionsLogin from "../modalsLogin/Options.login";
import OptionsRegister from "../modalRegister/Options.register.js";
import {useNavigate} from 'react-router-dom';

function NavB() {
    // verificar si hay un usuario logueado
    const [userlog, setUserlog] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const [modalRegister, setModalRegister] = useState(false);
    const [userdata , setUserdata] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {  
        handleLogin();     
    }, []);
    // cerrar sesion
    function handleLogout() {
        localStorage.removeItem("user");
        handleLogin();
        navigate("/");
    }

    // verificar si esta logueado 
    function handleLogin() {
        if (localStorage.getItem("user")) {
            setUserlog(true);
            setUserdata(JSON.parse(localStorage.getItem("user")));
            console.log(userdata)
            console.log("hay un usuario logueado");
        } else {
            setUserlog(false);
            console.log("no hay un usuario logueado");
        }
    }
    return (
        <>
        <Navbar className="navbody" expand="md">
            <Container fluid>
                <Navbar.Brand href="#home">
                    <img src={logonav} />{" "}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
                <Navbar.Offcanvas
                    aria-labelledby="offcanvasNavbarLabel-expand-md"
                    placement="end"
                >
                    <Offcanvas.Header closeButton className="navbody">
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                            Full Trip
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {userlog ? (() => {
                        switch (userdata.rol) {
                            case 1:
                                return (
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Nav.Link
                                            onClick={() => setModalLogin(true)}
                                        >
                                            Mi Perfil
                                        </Nav.Link>
                                        <Nav.Link
                                            onClick={() =>
                                                setModalRegister(true)
                                            }
                                        >
                                            Mis Servicios
                                        </Nav.Link>
                                        <Nav.Link
                                            onClick={() =>
                                                handleLogout()
                                            }
                                        >
                                            Cerrar Sesión
                                        </Nav.Link>
                                    </Nav>
                                );
                            case 2:
                                return (
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Nav.Link
                                            onClick={() =>
                                                handleLogout()
                                            }
                                        >
                                            Cerrar Sesión
                                        </Nav.Link>
                                    </Nav>
                                );
                            case 3:
                                return (
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Nav.Link
                                            onClick={() =>
                                                handleLogout()
                                            }
                                        >
                                            Cerrar Sesión
                                        </Nav.Link>
                                    </Nav>
                                );
                            case 4:
                                return (
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Nav.Link
                                            onClick={() =>
                                                handleLogout()
                                            }
                                        >
                                            Cerrar Sesión
                                        </Nav.Link>
                                    </Nav>
                                );                 
                            default:
                                return (
                                    <>
                                        <h1>Perfil</h1>
                                    </>
                                );
                        }
                    })() : (
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link onClick ={() => setModalLogin(true)}>
                                    Iniciar Sesión
                                </Nav.Link>
                                <Nav.Link  onClick ={() => setModalRegister(true)}>
                                    Registrarse
                                </Nav.Link>
                            </Nav>
                        )}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
        <OptionsLogin show={modalLogin} onHide={() => setModalLogin(false)} update={() =>handleLogin()} />
        <OptionsRegister show={modalRegister} onHide={() => setModalRegister(false)} update={() =>handleLogin()} />
    </>
    );
}

export default NavB;
