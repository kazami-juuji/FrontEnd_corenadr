import "../assets/style/Inicio.css";

import sueloImg from "../assets/img/sueloConservacion.jpg";
import importanciaImg from "../assets/img/importancia.jpg";
import especialImg from "../assets/img/especial.jpg";

const Inicio = () => {
  return (
    <div className="inicio">
      <section className="hero">
        <h1>Bienvenidos a Productos del Suelo de Conservación de la CDMX 🌽</h1>
        <p>Conoce nuestros productos orgánicos y de calidad.</p>
        <a href="/Productos" className="btn-dorado">Ir a listado</a>
      </section>

      {/* SECCIÓN 1 */}
      <section className="que-es py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* TEXTO */}
            <div className="col-md-6 text-center text-md-start">
              <h2 className="section-title">
                ¿Qué es el Suelo de Conservación de la Ciudad de México?
              </h2>
              <p className="section-text">
                El Suelo de Conservación es el corazón verde de la Ciudad de México. Comprende más de la mitad del territorio capitalino y está formado por bosques, humedales, montañas, zonas agrícolas, chinampas y comunidades rurales que producen alimentos de manera tradicional y sostenible. 
                Es un espacio único donde la biodiversidad, la cultura campesina y la vida urbana conviven.
              </p>
            </div>

            {/* IMAGEN */}
            <div className="col-md-6 text-center">
              <img
                src={sueloImg}
                className="img-fluid"
                alt="Suelo de Conservación"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 2 */}
      <section className="que-es py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* IMAGEN */}
            <div className="col-md-6 text-center">
              <img
                src={importanciaImg}
                className="img-fluid"
                alt="Importancia del Suelo de Conservación"
              />
            </div>

            {/* TEXTO */}
            <div className="col-md-6 text-center text-md-start">
              <h2 className="section-title">
                ¿Por qué es importante consumir productos del Suelo de Conservación de la CDMX?
              </h2>
              <p className="section-text">
                Al elegir productos del Suelo de Conservación, apoyas directamente a las familias que cuidan los ecosistemas de la ciudad, detienen el crecimiento de la mancha urbana y siembran con prácticas agroecológicas y mantienen viva la agricultura local.
                <br /><br />
                <p className="row align-items-end">Tu compra contribuye a:</p>
                <ul className="text-start mt-3" style={{ display: "inline-block" }}>
                  <li>Proteger los ecosistemas que abastecen de agua y oxígeno a la ciudad.</li>
                  <li>Impulsar economías rurales que dependen de la venta directa.</li>
                  <li>Conservar semillas nativas, técnicas tradicionales y saberes ancestrales.</li>
                  <li>Reducir la huella ambiental al consumir alimentos locales y de temporada.</li>
                </ul>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 3 */}
      <section className="que-es py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* TEXTO */}
            <div className="col-md-6 text-center text-md-start">
              <h2 className="section-title">
                ¿Qué hace especiales a los productos del Suelo de Conservación
              </h2>
              <p className="section-text">
                Los productos del Suelo de Conservación destacan por su origen, su calidad y la historia que llevan detrás. Son alimentos y transformados elaborados con prácticas agrícolas responsables, libres de agroquímicos y con un profunto respeto por la tierra.
              </p>
            </div>

            {/* IMAGEN */}
            <div className="col-md-6 text-center">
              <img
                src={especialImg}
                className="img-fluid"
                alt="Productos del Suelo de Conservación"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
