import { useState, useEffect } from "react";
import "../assets/style/Catalogo.css";

export default function GrupoProducto() {
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 15;
  const API = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${API}/usuario`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setLista(data);
        else if (Array.isArray(data.data)) setLista(data.data);
        else setLista([]);
      })
      .catch((err) => console.log("Error:", err));
  }, [API]);

  const filtrados = lista.filter((p) =>
    `${p.producto} ${p.marca} ${p.giroPrincipal}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const inicio = (paginaActual - 1) * porPagina;
  const paginados = filtrados.slice(inicio, inicio + porPagina);

  return (
    <div className="catalogo-container">
      <h1 className="catalogo-title">Catálogo de Productos y Marcas</h1>
      <p className="catalogo-subtitle">
        Explora el catálogo completo por producto, marca o giro.
      </p>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="🔍 Buscar producto o marca..."
        className="catalogo-search"
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1);
        }}
      />

      {/* GRID */}
      <div className="catalogo-grid">
        {paginados.map((p) => (
          <div key={p._id} className="catalogo-card">
            <div className="catalogo-header">
              <h4 className="catalogo-producto">{p.producto}</h4>
            </div>

            <p className="catalogo-presentacion">{p.presentación}</p>
            <p className="catalogo-marca">{p.marca}</p>
            <p className="catalogo-proveedor">{p.productor}</p>
            <p className="catalogo-telefono">Tel: {p.telefono1}</p>
            <p className="catalogo-alcaldia">📍 Alcaldía: {p.alcaldía}, {p.poblado}</p>
          </div>
        ))}
      </div>

      {/* PAGINACIÓN */}
      <div className="catalogo-pagination">
        <button
          className="page-btn"
          onClick={() => paginaActual > 1 && setPaginaActual(paginaActual - 1)}
        >
          ◀ Anterior
        </button>

        <span className="page-info">
          Página {paginaActual} de {totalPaginas}
        </span>

        <button
          className="page-btn"
          onClick={() =>
            paginaActual < totalPaginas && setPaginaActual(paginaActual + 1)
          }
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
}
