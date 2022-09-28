import React from "react";
import Layout from "./components/nav/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/dashboard" element={<Dashboard/>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
