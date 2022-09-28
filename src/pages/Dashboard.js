import React from "react";
import { useState, useEffect } from "react";
import "./styles/Home.css";
import Hotel from "../components/hotel/Hotel.js";
import Autos from "../components/auto/Auto.js";
import Aerolinea from "../components/Aerolinea/Aerolinea.js";
import Usuario from "../components/Usuario/Usuario.js";
import {useNavigate} from 'react-router-dom';

function Dashboard() {
    const [userlog, setUserlog] = useState(false);
    const [userdata, setUserdata] = useState(null);
    const navigate = useNavigate();
    // verificar la autenticacion
    useEffect(() => {
        handleLogin();
       
    }, []);

    function handleLogin() {
        if (localStorage.getItem("user")) {
            setUserlog(true);
            setUserdata(JSON.parse(localStorage.getItem("user")));
            console.log(userdata)
            console.log("hay un usuario logueado");
            
        } else {
            setUserlog(false);
            console.log("no hay un usuario logueado");
            navigate("/");
        }
    }
    return (
        <div className="mt homebody">
            { userlog && (() => {
                switch (userdata.rol) {
                    case 1:
                        return (
                           <Usuario userdata={userdata}/>
                        );
                    case 2:
                        return (
                            <Hotel hotel_id={1}/>
                        );
                    case 3:
                        return (
                            <Autos rental_id={1}/>
                        );
                    case 4:
                        return (
                            <Aerolinea airline_id={1}/>
                        );
                    default:
                        return (
                            <>
                                <h1> No hay datos que mostrar :( </h1>
                            </>
                        );
                }
            })()}
        </div>
    );
}

export default Dashboard;


/*
date
: 
"2022-09-23"
email
: 
"email@email.com"
name
: 
"nombre1"
pass1
: 
"123"
pass2
: 
"123"
rol
: 
1
user
: 
"user1"



{city: "ciudad1",
country: "pais1",
email: "email@email.com",
name: "hotel1",
pass: "123",
rol: 2 }

 localStorage.setItem("user",JSON.stringify({city: "ciudad1",
country: "pais1",
email: "email@email.com",
name: "hotel1",
pass: "123",
rol: 2 }));

*/