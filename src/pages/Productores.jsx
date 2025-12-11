import { useState, useEffect } from "react";
import "../assets/style/Productores.css";

export default function Productores() {
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [porPagina, setPorPagina] = useState(10); 
  const [paginaActual, setPaginaActual] = useState(1);
  const API = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${API}/usuario`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLista(data);
        } else if (Array.isArray(data.productor)) {
          setLista(data.productor);
        } else if (Array.isArray(data.data)) {
          setLista(data.data);
        } else if (Array.isArray(data.lista)) {
          setLista(data.lista);
        } else {
          console.error("❌ El backend NO envió un array");
          setLista([]);
        }
      })
      .catch((err) => console.log("Error:", err));
  }, [API]);

  // 🔹 Eliminar repetidos
  const unicos = lista.filter(
    (item, index, arr) =>
      index === arr.findIndex((p) => p.productor === item.productor)
  );

  // 🔹 Filtro búsqueda
  const filtrados = unicos.filter((p) =>
    p.productor?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔹 Paginación
  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const inicio = (paginaActual - 1) * porPagina;
  const paginados = filtrados.slice(inicio, inicio + porPagina);

  const cambiarPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) {
      setPaginaActual(num);
    }
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Lista de Productores</h1>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar productor..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />

        {/* Selector de registros por página */}
        <select
          className="selector"
          value={porPagina}
          onChange={(e) => {
            setPorPagina(Number(e.target.value));
            setPaginaActual(1);
          }}
        >
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
          <option value={100}>100 por página</option>
        </select>
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>Productor</th>
            <th>Telefono</th>
            <th>Pagina Web</th>
            <th>Facebook</th>
            <th>Instagram</th>
            <th>Whatsapp</th>
            
          </tr>
        </thead>

        <tbody>
          {paginados.map((p) => (
            <tr key={p._id}>
              <td>{p.productor}</td>
              <td>{p.telefono1}</td>
              <td>{p.paginaWeb}</td>
              <td>{p.facebook}</td>
              <td>{p.instagram}</td>
              <td>{p.whatsapp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Controles de paginación */}
      <div className="paginacion">
        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
          ◀
        </button>

        <span>
          Página {paginaActual} de {totalPaginas}
        </span>

        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
