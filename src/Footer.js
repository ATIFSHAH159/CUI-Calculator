import { FaInstagramSquare, FaLinkedin, FaFacebookSquare, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import './Assests/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>
          <span className="purple-text">Get in</span> <span className="yellow-text">Touch</span>
        </h2>
        <p>
          Developed By: Syed Atif Shah
        </p>
        <div className="social-icons">
          <a href="https://www.instagram.com/atif_shah90?igsh=dGcwbGZobTdjOGZ2" aria-label="Instagram">
            <FaInstagramSquare className="icon" />
          </a>
          <a href="https://www.linkedin.com/in/aatif-shah-648bb7230/" aria-label="LinkedIn">
            <FaLinkedin className="icon" />
          </a>
          <a href="https://www.facebook.com/atif.shah.37819959?mibextid=LQQJ4d" aria-label="Facebook">
            <FaFacebookSquare className="icon" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; LogicSphere</p>
      </div>
    </footer>
  );
}

export default Footer;
