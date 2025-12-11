import { useState, useEffect } from "react";
import "../assets/style/GiroPrincipal.css";

const Productores =() => {
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 20;

  useEffect(() => {
    fetch("http://localhost:3000/usuario")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLista(data);
        } else if (Array.isArray(data.data)) {
          setLista(data.data);
        } else {
          console.error("❌ El backend NO envió un array");
          setLista([]);
        }
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  // 🔹 Filtro por marca
  const filtrados = lista.filter((p) =>
    p.marca?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔹 Paginación
  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const inicio = (paginaActual - 1) * porPagina;
  const paginados = filtrados.slice(inicio, inicio + porPagina);

  const siguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const anterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Giro Principal y Marca</h1>

      {/* 🔹 Buscador */}
      <div className="filtrosCabecera">
        <input
          type="text"
          placeholder="Buscar el producto..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
          className="input-busqueda"
        />
      </div>

      {/* 🔹 GRID */}
      <div className="grid-catalogo">
        {paginados.map((p) => (
          <div className="card-catalogo" key={p._id}>
            <h2 className="giroPrincipal">{p.giroPrincipal}</h2>
            <p className="marca">
              Marca: <strong>{p.marca}</strong>
            </p>
          </div>
        ))}
      </div>

      <br />

      {/* 🔹 Paginación */}
      <div className="paginacionTop">
        <button onClick={anterior} disabled={paginaActual === 1}>
          ◀
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button onClick={siguiente} disabled={paginaActual === totalPaginas}>
          ▶
        </button>
      </div>
    </div>
  );
}
export default Productores;