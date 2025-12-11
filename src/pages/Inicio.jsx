// import "../assets/style/Inicio.css";

// const Inicio = () => {
//   return (
//     <div className="inicio">
//       <section className="hero">
//         <h1>Bienvenidos a Productos del Suelo de Conservación de la CDMX 🌽</h1>
//         <p>Conoce nuestros productos orgánicos y de calidad.</p>
//         <a href="/Productos" className="btn-dorado">Ir a catalogo</a>
//       </section>

//       <section className="features">
//         <div className="feature-card">🌱 </div>
//         <div className="feature-card">🥕</div>
//         <div className="feature-card">🚜 </div>
//       </section>

//         {/* SECCIÓN "¿Qué es CORENADR?" */}
//         <section className="que-es py-5">
//         <div className="container">
//             <div className="row align-items-center">
            
//             {/* Columna izquierda - Imagen */}
//             <div className="col-md-6 text-center">
//                 <img 
//                 src="/img/corena.jpg" 
//                 alt="CORENADR" 
//                 className="img-fluid que-es-img"
//                 />
//             </div>

//             {/* Columna derecha - Texto */}
//             <div className="col-md-6 text-md-start text-center">
//                 <h2 className="section-title">¿Qué es CORENADR?</h2>
//                 <p className="section-text">
//                 <strong>CORENADR</strong> (Comisión de Recursos Naturales y Desarrollo Rural) 
//                 es una iniciativa dedicada a preservar el suelo de conservación y promover 
//                 productos agrícolas de alta calidad. Nuestro compromiso es mantener la tradición, 
//                 proteger el medio ambiente y ofrecer lo mejor de la tierra a tu mesa.
//                 </p>
//             </div>
//             </div>
//         </div>
// </section>


//     <section className="que-es py-5">
//   <div className="container">
//     <div className="row align-items-center">
      
//       {/* Columna izquierda - Texto */}
//       <div className="col-md-6 text-md-start text-center">
//         <h2 className="section-title">¿Qué es la Subdirección de cadenas?</h2>
//         <p className="section-text">
//           Es una unidad administrativa adscrita a la Dirección de Producción Sustentable de la Secretaría del Medio Ambiente de la CDMX. 
//           Secretaría del Medio Ambiente
//           Está encargada de formular políticas, programas y acciones para fortalecer las actividades agroalimentarias, agroindustriales, piscícolas y ecoturísticas que se desarrollan en la zona rural de la CDMX en el suelo de conservación, asegurando que dichas actividades sean sostenibles, respetuosas con el ambiente y compatibles con las normas de conservación. 
//           Secretaría del Medio Ambiente
//         </p>
//       </div>

//       {/* Columna derecha - Imagen */}
//       <div className="col-md-6 text-center">
//         <img 
//           src="/img/corena.jpg" 
//           alt="CORENADR" 
//           className="img-fluid que-es-img"
//         />
//       </div>

//     </div>
//   </div>
// </section>



//     </div>

    
//   );
// };

// export default Inicio;
import "../assets/style/Inicio.css";

const Inicio = () => {
  return (
    <div className="inicio">
      <section className="hero">
        <h1>Bienvenidos a Productos del Suelo de Conservación de la CDMX 🌽</h1>
        <p>Conoce nuestros productos orgánicos y de calidad.</p>
        <a href="/Productos" className="btn-dorado">Ir a listado</a>
      </section>

      <section className="features">
        <div className="feature-card">🌱 </div>
        <div className="feature-card">🥕</div>
        <div className="feature-card">🚜 </div>
      </section>




      {/* SECCIÓN "¿Qué es el Suelo de Conservación?" */}
      <section className="que-es py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <h2 className="section-title">¿Qué es el Suelo de Conservación de la Ciudad de México?</h2>
              <p className="section-text">
                El Suelo de Conservación es el corazón verde de la Ciudad de México. Comprende más de la mitad del territorio capitalino y está formado por bosques, humedales, montañas, zonas agrícolas, chinampas y comunidades rurales que producen alimentos de manera tradicional y sostenible. 
                Es un espacio único donde la biodiversidad, la cultura campesina y la vida urbana conviven.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN "¿Por qué es importante consumir productos del Suelo de Conservación?" */}
      <section className="que-es py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <h2 className="section-title">¿Por qué es importante consumir productos del Suelo de Conservación de la CDMX?</h2>
              <p className="section-text">
                Al elegir productos del Suelo de Conservación, apoyas directamente a las familias que cuidan los ecosistemas de la ciudad, detienen el crecimiento de la mancha urbana y siembran con prácticas agroecológicas y mantienen viva la agricultura local.
                <br /><br />
                <p className="row align-items-end">Tu compra contribuye a:</p>
                <ul className="text-start mt-3" style={{display: "inline-block"}}>
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

      {/* SECCIÓN "¿Qué hace especiales los productos del Suelo de Conservación?" */}
      <section className="que-es py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <h2 className="section-title">¿Qué hace especiales los productos del Suelo de Conservación?</h2>
              <p className="section-text">
                Los productos del Suelo de Conservación destacan por su origen, su calidad y la historia que llevan detrás. Son alimentos y transformados elaborados con prácticas agrícolas responsables, libres de agroquímicos y con un profunto respeto por la tierra.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;