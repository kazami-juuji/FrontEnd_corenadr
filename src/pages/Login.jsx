import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import "../assets/style/Login.css";
import { useContext, useState } from "react";
import Contexto from "../context/Contexto.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const App = () => {
  const { login } = useContext(Contexto);
  const navigate = useNavigate();
  const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false);
  const [correoRecuperacion, setCorreoRecuperacion] = useState("");
  const [mensajeRecuperacion, setMensajeRecuperacion] = useState("");
  const API = process.env.REACT_APP_API_URL;

  const validaciones = {
    usuario: {
      required: "El campo usuario es requerido",
      pattern: {
        value: /[a-zA-Z0-9]+/,
        message: "El usuario solo puede contener letras y números",
      },
    },
    password: {
      required: "El campo password es requerido",
      pattern: {
        value: /[a-zA-Z0-9]+/,
        message: "La contraseña solo puede contener letras y números",
      },
    },
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    fetch(`${API}/login`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        administrador: data.usuario,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((respuesta) => {
        if (respuesta.estado === "3") {
          alert("No puedes iniciar sesión, tu cuenta está inhabilitada");
          return;
        }

        if (respuesta.token && respuesta.usuario) {
          login({
            token: respuesta.token,
            usuario: respuesta.usuario,
            rol: respuesta.rol,
          });

          alert("Inicio de sesión válido");
          console.log(respuesta.token , respuesta.usuario);
          window.location.href = "/";
          
          navigate("/", { replace: true });
        } else {
          alert("Credenciales no válidas");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor. Intenta más tarde.");
      });
  };
  const enviarRecuperacion = () => {
  fetch(`${API}recuperar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo: correoRecuperacion }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error || data.mensaje === "Correo no válido") {
        setMensajeRecuperacion("❌ El correo no está registrado o no coincide.");
      } else {
        setMensajeRecuperacion("✅ Se envió una nueva contraseña a tu correo.");
        setTimeout(() => {
          setMostrarRecuperacion(false);
          setCorreoRecuperacion("");
          setMensajeRecuperacion("");
        }, 2000);
      }
    })
    .catch(() => {
      setMensajeRecuperacion("❌ Error, intenta más tarde.");
    });
};


  return (
    <div className="login-container">
      {mostrarRecuperacion && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Recuperar contraseña</h3>

            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={correoRecuperacion}
              onChange={(e) => setCorreoRecuperacion(e.target.value)}
              className="login-input"
            />

            <button onClick={enviarRecuperacion} className="login-button">
              Enviar contraseña
            </button>

            {mensajeRecuperacion && (
              <p className="login-error">{mensajeRecuperacion}</p>
            )}

            <p 
              style={{ cursor: "pointer", marginTop: "10px", color: "#555" }}
              onClick={() => setMostrarRecuperacion(false)}
            >
              Cancelar
            </p>
          </div>
        </div>
      )}

      <div className="login-box">
        <h1 className="login-title">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Usuario */}
          <div className="login-group">
            <FontAwesomeIcon icon={faUser} className="login-icon" />
            <input
              {...register("usuario", validaciones.usuario)}
              type="text"
              placeholder="Usuario"
              className="login-input"
            />
          </div>
          {errors.usuario && (
            <p className="login-error">{errors.usuario.message}</p>
          )}

          {/* Password */}
          <div className="login-group">
            <FontAwesomeIcon icon={faLock} className="login-icon" />
            <input
              {...register("password", validaciones.password)}
              type="password"
              placeholder="Contraseña"
              className="login-input"
            />
          </div>
          {errors.password && (
            <p className="login-error">{errors.password.message}</p>
          )}

          <button type="submit" className="login-button">
            <FontAwesomeIcon icon={faDoorOpen} className="me-2" />
            Iniciar Sesión
          </button>
          
          <p onClick={() => setMostrarRecuperacion(true)} style={{cursor: "pointer", padding : "15px"}}>
            ¿Olvidaste tu contraseña?
          </p>

        </form>
      </div>
    </div>
  );
};

export default App;
