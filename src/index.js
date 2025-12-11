import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import Provider from './context/Provider.jsx';

import Layout from "./component/Layout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Productos from "./pages/Productos.jsx";
import Login from "./pages/Login.jsx";
import Error from "./pages/Error.jsx";
import Alcaldia from "./pages/Alcaldia.jsx"
import Productores from "./pages/Productores.jsx";
import GiroPrincipal from "./pages/GiroPrincipal.jsx"
import Catalogo from "./pages/Catalogo.jsx"



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider>
    <React.StrictMode>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="productos" element={<Productos />} />
            <Route path="login" element={<Login />} />
            <Route path="error" element={<Error />}/>
            <Route path="alcaldia" element={<Alcaldia />} />
            <Route path="productores" element={<Productores />} />
            <Route path="giroPrincipal" element={<GiroPrincipal />} />
            <Route path="catalogo" element={<Catalogo />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
