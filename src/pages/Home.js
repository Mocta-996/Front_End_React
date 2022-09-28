import React from "react";
import { useState, useEffect } from "react";
import "./styles/Home.css";
import {useNavigate} from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/dashboard");
           
        }
       
    }, []);
    return (
        <div className="mt homebody">
            <h1>Home</h1>
        </div>
    );
}

export default Home;
