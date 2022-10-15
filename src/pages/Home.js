import React from "react";
import { useState, useEffect } from "react";
import "./styles/Home.css";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import fondo from "../images/Group 4.png";
function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/dashboard");
        }
    }, []);
    return (
        <div className="mt homebody">
            <Container>
                <Row className="hijo">
                    <Col></Col>
                    <Col md="auto">
                        {" "}
                        <Image src={fondo} className="logo" />
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
