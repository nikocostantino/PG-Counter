import React from 'react';
import { Container } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '3px', // Padding per il footer
    textAlign: 'center', // Centra il testo
  };

  return (
    <footer style={footerStyle}>
      <Container className="text-center">
        <p className="mb-2">© {currentYear} • All Rights Reserved • Developed by Nicola Costantino</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="https://facebook.com/nico.costantino.5" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com/nikocostantino" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="mailto:nicoc840@gmail.com">
            <FaEnvelope size={24} />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
