import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import '../assets/style/NavBar.css';
import Contexto from "../context/Contexto";

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, cerrar_sesion } = useContext(Contexto);

  const handleCerrarSesion = () => {
    cerrar_sesion(); // limpia usuario en contexto
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav className="navbar navbar-expand-lg fixed-top product-navbar">
        <div className="container">
          <img src="/img/logo.png" alt="Logo" width="50" height="50" className="me-2" />
          <NavLink className="navbar-brand" to="/">
            Productos del suelo de conservación de la CDMX 🌱
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/">🏠 Inicio</NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/Productos">🌽 Listado</NavLink>
              </li>

              {usuario ? (
                <>
                  <li className="nav-item me-3">
                    <span className="nav-link">
                      🌟 Hola, <strong>{usuario.usuario}</strong>
                    </span>
                  </li>
                  <li className="nav-item me-3">
                    <button className="btn btn-outline-danger" onClick={handleCerrarSesion}>
                      🚪 Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item me-3">
                  <NavLink className="nav-link" to="/Login">🔑 Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* SEGUNDO NAVBAR */}
      <nav className="navbar navbar-expand-lg sub-navbar">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#subMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="subMenu">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/Catalogo">Catalogo</NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/Alcaldia">Alcaldía</NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/GiroPrincipal">Giro Principal</NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/Productores">Productores</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
