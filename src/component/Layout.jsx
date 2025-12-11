import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Outlet />  {/* Aquí se renderizan Inicio, Productos, Login */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
