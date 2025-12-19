import { useState, useEffect, useContext } from "react";
import "../assets/style/Productos.css";
import Swal from "sweetalert2";
import Contexto from "../context/Contexto.jsx";

export default function Productos() {
  const { usuario } = useContext(Contexto);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(25);

  // Modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
  const API = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${API}/usuario`)
      .then((res) => res.json())
      .then((data) => setProductos(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, [API]);

  // FILTRO
  const productosFiltrados = productos.filter((p) =>
    Object.values(p).some((valor) =>
      String(valor).toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  // PAGINACIÓN
  const totalRegistros = productosFiltrados.length;
  const totalPaginas = Math.max(1, Math.ceil(totalRegistros / registrosPorPagina));
  const indiceUltimo = paginaActual * registrosPorPagina;
  const indicePrimero = indiceUltimo - registrosPorPagina;
  const productosPagina = productosFiltrados.slice(indicePrimero, indiceUltimo);

  const cambiarPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) setPaginaActual(num);
  };

  const obtenerPaginas = () => {
    let paginas = [];
    let inicio = Math.max(1, paginaActual - 2);
    let fin = Math.min(totalPaginas, paginaActual + 2);

    if (inicio > 1) paginas.push(1, "...");
    for (let i = inicio; i <= fin; i++) paginas.push(i);
    if (fin < totalPaginas) paginas.push("...", totalPaginas);

    return paginas;
  };

  // ──────────────────────────────────────────────
  //              FORMULARIO
  // ──────────────────────────────────────────────
  const abrirAgregar = () => {
    setProductoActual({
      productor: "",
      marca: "",
      telefono1: "",
      telefono2: "",
      giroPrincipal: "",
      producto: "",
      presentacion: "",
      poblado: "",
      alcaldia: "",
      paginaWeb: "",
      facebook: "",
      instagram: "",
      whatsapp: "",
      // nombreOriginal no debe existir en creación
    });

    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoActual(null);
  };

  const guardarProducto = async () => {
    if (!productoActual) return;

    try {
      const esEdicion = Boolean(productoActual._id);

      const url = esEdicion
        ? `${API}/usuario/actualizar/${productoActual._id}`
        : `${API}/registro`;

      const method = esEdicion ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Autorizacion: "Back " + (usuario?.token || ""),
        },
        body: JSON.stringify(productoActual),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: esEdicion
            ? "Registro actualizado correctamente"
            : "Registro agregado correctamente",
        });

        if (esEdicion) {
          setProductos((prev) =>
            prev.map((p) =>
              p._id === productoActual._id ? data : p
            )
          );
        } else {
          setProductos((prev) => [...prev, data]);
        }

        cerrarModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || data.mensaje || "No se pudo guardar el registro",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al guardar el registro",
      });
    }
  };



  const editarProducto = (id) => {
    const producto = productos.find((p) => p._id === id);
    if (!producto) return;
      
      setProductoActual({ ...producto });
      setMostrarModal(true);
  };


  // ──────────────────────────────────────────────
  //                ELIMINAR
  // ──────────────────────────────────────────────
  const eliminarProducto = (id) => {
    const producto = productos.find((p) => p._id === id);
    if (!producto) return;

    const nombre = producto.productor?.replace(/[|]/g, "").trim();

    if (!nombre) {
      return Swal.fire("Error", "El registro no tiene nombre de productor", "error");
    }

    Swal.fire({
      title: "¿Eliminar productor?",
      text: `Se eliminará el registro de "${nombre}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const res = await fetch(
          `${API}/usuario/eliminar/${id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: { Autorizacion: "Back " + (usuario?.token || "") },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          return Swal.fire("Error", data.mensaje || "No se pudo eliminar", "error");
        }

        setProductos((prev) => prev.filter((p) => p._id !== id));

        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "Registro eliminado correctamente.",
          timer: 1500,
        });
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo conectar al servidor", "error");
      }
    });
  };
  return (
    <div className="contenedor-tabla">
      {/* Banner */}
      <div className="banner-gobierno">
        <h1>Listado de Productos</h1>
        <p>
          Consulta los <strong>{productos.length}</strong> registros disponibles
        </p>
      </div>

      {/* FILTRO */}
      <div className="toolbar">
        <input
          type="text"
          placeholder="Buscar por productor, producto o alcaldía..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
        />

        <div className="selector-registros">
          <label>Mostrar</label>
          <select
            value={registrosPorPagina}
            onChange={(e) => {
              setRegistrosPorPagina(Number(e.target.value));
              setPaginaActual(1);
            }}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>por página</span>
        </div>

        {usuario && (
          <div className="acciones-superior">
            <button className="btn-agregar" onClick={abrirAgregar}>
              + Agregar
            </button>
          </div>
        )}
      </div>

      {/* TABLA */}
      <table className="tabla-gobierno">
        <thead>
          <tr>
            <th>Productor</th>
            <th>Marca</th>
            <th>Telefono 1</th>
            <th>Telefono 2</th>
            <th>Giro</th>
            <th>Producto</th>
            <th>Presentación</th>
            <th>Poblado</th>
            <th>Alcaldía</th>
            <th>Pagina Web</th>
            <th>Facebook</th>
            <th>Instagram</th>
            <th>Whatsapp</th>
            {usuario && <th style={{ minWidth: "150px" }}>Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {productosPagina.map((p) => (
            <tr key={p._id || p.productor}>
              <td data-label="Productor">{p.productor}</td>
              <td data-label="Marca">{p.marca}</td>
              <td data-label="Teléfono 1">{p.telefono1}</td>
              <td data-label="Teléfono 2">{p.telefono2}</td>
              <td data-label="Giro">{p.giroPrincipal}</td>
              <td data-label="Producto">{p.producto}</td>
              <td data-label="Presentación">{p.presentación}</td>
              <td data-label="Poblado">{p.poblado}</td>
              <td data-label="Alcaldía">{p.alcaldía}</td>
              <td data-label="Página Web">{p.paginaWeb}</td>
              <td data-label="Facebook">{p.facebook}</td>
              <td data-label="Instagram">{p.instagram}</td>
              <td data-label="Whatsapp">{p.whatsapp}</td>

              {usuario && (
                <td className="acciones">
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProducto(p._id)}
                  >
                    ❌
                  </button>

                  <button
                    className="btn-editar"
                    onClick={() => editarProducto(p._id)}
                  >
                    ✏️
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div className="footer-tabla">
        <div className="info-registros">
          Mostrando <strong>{totalRegistros === 0 ? 0 : indicePrimero + 1}</strong>–
          <strong>{Math.min(indiceUltimo, totalRegistros)}</strong> de{" "}
          <strong>{totalRegistros}</strong>
        </div>

        <div className="paginacion">
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            ◀
          </button>

          {obtenerPaginas().map((num, idx) =>
            num === "..." ? (
              <span key={idx} className="puntos">
                ...
              </span>
            ) : (
              <button
                key={num}
                onClick={() => cambiarPagina(num)}
                className={paginaActual === num ? "activo" : ""}
              >
                {num}
              </button>
            )
          )}

          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            ▶
          </button>
        </div>
      </div>

      {/* MODAL */}
      {mostrarModal && productoActual && (
        <div className="modal-overlay">
          <div className="modal-contenido modal-dos-columnas">
            <h2>{productoActual._id ? "Editar Producto" : "Agregar Producto"}</h2>

            <div className="form-columns">
              <div className="columna">
                <label>👤 Productor</label>
                <input
                  type="text"
                  placeholder="Ingresa el nombre del productor"
                  value={productoActual.productor}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, productor: e.target.value })
                  }
                />

                <label>🏷 Marca</label>
                <input
                  type="text"
                  placeholder="Escribe la marca del producto"
                  value={productoActual.marca}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, marca: e.target.value })
                  }
                />

                <label>📞 Teléfono 1</label>
                <input
                  type="number"
                  placeholder="Ej. 5512345678"
                  value={productoActual.telefono1}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, telefono1: e.target.value })
                  }
                />

                <label>📞 Teléfono 2</label>
                <input
                  type="number"
                  placeholder="Opcional"
                  value={productoActual.telefono2}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, telefono2: e.target.value })
                  }
                />

                <label>🏭 Giro</label>
                <input
                  type="text"
                  placeholder="Ej. Agricultura, Bebidas, etc."
                  value={productoActual.giroPrincipal}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, giroPrincipal: e.target.value })
                  }
                />

                <label>📦 Producto</label>
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={productoActual.producto}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, producto: e.target.value })
                  }
                />

                <label>📏 Presentación</label>
                <input
                  type="text"
                  placeholder="Ej. Botella 1L, Bolsa 500g"
                  value={productoActual.presentacion}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, presentacion: e.target.value })
                  }
                />
              </div>

              <div className="columna">
                <label>📍 Poblado</label>
                <input
                  type="text"
                  placeholder="Ej. San Miguel"
                  value={productoActual.poblado}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, poblado: e.target.value })
                  }
                />

                <label>🏛 Alcaldía</label>
                <input
                  type="text"
                  placeholder="Ej. Coyoacán"
                  value={productoActual.alcaldia}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, alcaldia: e.target.value })
                  }
                />

                <label>🌐 Página web</label>
                <input
                  type="text"
                  placeholder="https://sitio.com"
                  value={productoActual.paginaWeb}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, paginaWeb: e.target.value })
                  }
                />

                <label>📘 Facebook</label>
                <input
                  type="text"
                  placeholder="Perfil o página de Facebook"
                  value={productoActual.facebook}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, facebook: e.target.value })
                  }
                />

                <label>📸 Instagram</label>
                <input
                  type="text"
                  placeholder="@usuario"
                  value={productoActual.instagram}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, instagram: e.target.value })
                  }
                />

                <label>💬 Whatsapp</label>
                <input
                  type="text"
                  placeholder="Número de WhatsApp"
                  value={productoActual.whatsapp}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, whatsapp: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="modal-botones">
              <button
                className="btn-guardar"
                onClick={guardarProducto}
                // productoActual._id ? actualizarProducto : 
              >
                Guardar
              </button>

              <button className="btn-cerrar" onClick={cerrarModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
