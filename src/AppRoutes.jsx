import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import About from "./pages/About";
import Price from "./pages/Price";
import Admin from "./pages/Admin";
import Competition from "./pages/Competition";

const AppRoutes = ({onChildValueChange}) => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/price" element={<Price onChildValueChange={onChildValueChange} />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
}

export default AppRoutes;