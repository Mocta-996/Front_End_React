import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Hotel.css";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function Calendar(props) {
    const [month, setMonth] = useState(-1);
    const [year, setYear] = useState(-1);
    const [todoCalendar, setTodoCalendar] = useState([]);
    useEffect(() => {
        //handlerData();
        //setTodoCalendar(calendar);
        console.log(props);
    }, []);

    const handlerData =async () => {
        console.log(year);
        console.log(month);
        console.log("deberia de mostrar algo");
        // verificar si el valor no es -1
        if (year == -1) {
            Error("Error", "Debe seleccionar un año", "error");
            return;
            // hacer la consulta
        } else if (month == -1) {
            Error("Error", "Debe seleccionar un mes", "error");
            return;
        }
        const body= {id_hotel:props.hotel_id,anio:parseInt(year),mes:parseInt(month)};
        console.log(body)
        try{
            const res= await axios.post("http://35.239.122.121:4000/api/fulltrip/v1/hotel/calendar",{info:JSON.stringify(body)});
            console.log("calendar",res)
            setTodoCalendar(res.data.data);
          }catch(ex){
            console.log(ex);
            Error("Error", "Ocurrio un error, intente más tarde", "error");
          }
    };

    return (
        <Container>
            <br />
            <Row className="bodydiv">
                <Col xs={6} md={4}>
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        {meses.map((mes) => (
                            <option value={mes.value} key={mes.value}>
                                {mes.name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs={6} md={4}>
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setYear(e.target.value)}
                    >
                        {anios.map((mes) => (
                            <option value={mes.value} key={mes.value}>
                                {mes.name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs={6} md={4}>
                    <Button variant="light" onClick={() => handlerData()}>
                        Consultar
                    </Button>{" "}
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Actividades</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoCalendar.length > 0
                            ? todoCalendar.map((item,index) => (
                                  <tr key ={index}>
                                      <td> <p> {item.dia} </p></td>
                                          {item.contenido.length > 0 ? (
                                              <td>
                                                  {item.contenido.map((it,ind) => (
                                                      <p key={ind}>{it}</p>
                                                  ))}
                                              </td>
                                          ) : <td>--</td>}
                                     
                                  </tr>
                              ))
                            : <tr><td> </td><td> </td></tr>}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

const Error = (title, msg, icon) => {
    Swal.fire(title, msg, icon);
};

const calendar = [
    {
        dia: "2022/01/01",
        contenido: [
            "Inicio reservacion: ..... por: .... ",
            "Fin reservaion..",
            "",
        ],
    },
    {
        dia: "2022/01/01",
        contenido: [
            "Inicio reservacion: ..... por: .... ",
            "Fin reservaion..",
            "",
        ],
    },
    {
        dia: "2022/01/01",
        contenido: [
            "Inicio reservacion: ..... por: .... ",
            "Fin reservaion..",
            "",
        ],
    },
    {
        dia: "2022/01/01",
        contenido: [
            "Inicio reservacion: ..... por: .... ",
            "Fin reservaion..",
            "",
        ],
    },
];

const meses = [
    { name: "Selecione un mes", value: -1 },
    { name: "Enero", value: 0 },
    { name: "Febrero", value: 1 },
    { name: "Marzo", value: 2 },
    { name: "Abril", value: 3 },
    { name: "Mayo", value: 4 },
    { name: "Junio", value: 5 },
    { name: "Julio", value: 6 },
    { name: "Agosto", value: 7 },
    { name: "Septiembre", value: 8 },
    { name: "Octubre", value: 9 },
    { name: "Noviembre", value: 10 },
    { name: "Diciembre", value: 11 },
];

const anios = [
    { name: "Selecione un año", value: -1 },
    { name: "2021", value: 2021 },
    { name: "2022", value: 2022 },
    { name: "2023", value: 2023 },
    { name: "2024", value: 2024 },
    { name: "2025", value: 2025 },
    { name: "2026", value: 2026 },
    { name: "2027", value: 2027 },
    { name: "2028", value: 2028 },
    { name: "2029", value: 2029 },
    { name: "2030", value: 2030 },
    { name: "2031", value: 2031 },
    { name: "2032", value: 2032 },
    { name: "2033", value: 2033 },
    { name: "2034", value: 2034 },
    { name: "2035", value: 2035 },
    { name: "2036", value: 2036 },
];

export default Calendar;
