import { useState } from "react";
import "../assets/style/Alcaldia.css";

const alcaldias = [
  {
    nombre: "Tlalpan",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15035.694503813156!2d-99.2490006!3d19.2830492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce00961fed5cf7%3A0x83cd46d9ff2d651f!2sTlalpan!5e0!3m2!1ses!2smx!4v1700000000010"
  },
  {
    nombre: "Milpa Alta",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15039.723130987004!2d-99.0272824!3d19.1864546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd8ec85ee511c1%3A0x27f3f9d57c495b56!2sMilpa%20Alta!5e0!3m2!1ses!2smx!4v1700000000021"
  },
  {
    nombre: "Tláhuac",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15035.600943651704!2d-99.028507!3d19.2811585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cdff8fbca4d7d5%3A0x9ac12f90b9fc5fbd!2sTlahuac!5e0!3m2!1ses!2smx!4v1700000000030"
  },
  {
    nombre: "Magdalena Contreras",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15037.692222918339!2d-99.2620745!3d19.3205094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce01e0f04e3d8f%3A0x3d9247b2930160c3!2sLa%20Magdalena%20Contreras!5e0!3m2!1ses!2smx!4v1700000000042"
  },
  {
    nombre: "Xochimilco",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.1034181365535!2d-99.117506!3d19.246170!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d202901d3210af%3A0x8c8de8ea30b79f7f!2sXochimilco!5e0!3m2!1ses!2smx!4v1700000000050"
  },
  {
    nombre: "Álvaro Obregón",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.8911454099136!2d-99.214476!3d19.349725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8b0a64f41d3%3A0xa32a5ab828a53ea5!2s%C3%81lvaro%20Obreg%C3%B3n!5e0!3m2!1ses!2smx!4v1700000000060"
  },
  {
    nombre: "Cuajimalpa",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.593767297713!2d-99.296064!3d19.286875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20150d607ce17%3A0x2c0f33d3a3812795!2sCuajimalpa%20de%20Morelos!5e0!3m2!1ses!2smx!4v1700000000070"
  }
];

const Alcaldia = () => {
  const [seleccion, setSeleccion] = useState(alcaldias[0]);

  return (
    <div className="inicio">
      <h1 className="titulo">Alcaldías donde se encuentran nuestros productos</h1>

      {/* BOTONES */}
      <div className="lista-alcaldias">
        {alcaldias.map((a, index) => (
          <button
            key={index}
            className={`btn-alcaldia ${seleccion.nombre === a.nombre ? "activo" : ""}`}
            onClick={() => setSeleccion(a)}
          >
            {a.nombre}
          </button>
        ))}
      </div>

      {/* NOMBRE DE LA ALCALDÍA */}
      <h2 className="nombre-actual">{seleccion.nombre}</h2>

      {/* MAPA */}
      <div className="mapa-bonito">
        <iframe
          title={seleccion.nombre}
          src={seleccion.mapa}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Alcaldia;
