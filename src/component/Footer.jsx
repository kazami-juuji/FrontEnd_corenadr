import "../assets/style/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">

        <div className="footer-col">
          <h4>Productos de Cadenas Agroalimentarias</h4>
          <p>
            Av. Año de Juárez 9700 Quirino Mendoza, Pueblo de San Luis Tlaxialtemalco,
            Xochimilco, CDMX, 16610 México
          </p>
          <p>
            Belisario Domínguez 9700, San Luis Tlaxialtemalco,
            Xochimilco, 16610 Ciudad de México, CDMX
          </p>
          <p><strong>Tel:</strong> (55) 5843-3411</p>
        </div>

        <div className="footer-col">
          <h4>Horario</h4>
          <p>Lunes – Viernes</p>
          <p>10 a.m. – 6 p.m.</p>
        </div>


        <div className="footer-col">
          <h4>Síguenos</h4>
          <ul className="footer-social">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="social-icon" /> Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="social-icon" /> Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} className="social-icon" /> Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Productos de Cadenas Agroalimentarias - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
