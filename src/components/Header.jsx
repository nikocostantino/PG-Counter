import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { log } from '../log.js';
import logoImg from '../assets/pino.jpg';
import { useLogin } from './LoginContext'; // Importiamo il contesto
import { login as doLogin, logout, getToken, isAuthenticated } from '../services/apiService';
import { Image } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

export default function Header() {
  log('<Header /> rendered', 1);

  const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // Tablet e telefoni

  // Stato per gestire la visibilità della modale
  const [showModal, setShowModal] = useState(false);
  const { login, setLogin } = useLogin(); // Otteniamo il valore di login e la funzione per modificarlo
  const [error, setError] = useState('');
  // Stato per i campi del login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Funzione per aprire la modale
  const handleShow = () => setShowModal(true);

  // Funzione per chiudere la modale
  const handleClose = () => {
    setUsername("");
    setPassword("");
    setError("");
    setShowModal(false);
  }

  // Funzione di gestione del login
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Login:', { username, password });
    // Qui aggiungi la logica per autenticare l'utente
    const result = await doLogin(username, password);
    setLogin(result.success);
    if(result.success){
      handleClose(); // Chiudi la modale dopo il login
      setError("");
      setUsername("");
      setPassword("");
    }
    else
      setError("credenziali errate");
  };
    // Funzione di gestione del login
    const setLogout = (event) => {
      logout();
      setLogin(false);
    };

  return (
    <header id="main-header">
      <Image 
        src={logoImg} 
        fluid 
        style={{ 
          width: isSmallScreen ? '70vw' : '25vw', 
          height: 'auto', 
          marginBottom: '5px' 
        }} 
      />
      <h1></h1>

      {login==false &&
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>  }
      {login==true &&
      <Button variant="primary" onClick={setLogout}>
        Logout
      </Button>  }

      {/* Modale di login */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#343a40' }}>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUsername">
              <Form.Label style={{ color: '#343a40' }}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" style={{ marginTop: '10px' }}>
              <Form.Label style={{ color: '#343a40' }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
            <p style={{ color: 'red', marginTop: '10px', textAlign: 'center'}}>{error}</p>
            </Form>
        </Modal.Body>
      </Modal>

    </header>
  );
}
