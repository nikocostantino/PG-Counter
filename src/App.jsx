import { useState, useEffect } from 'react';
import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import { fetchAppData } from './services/apiService';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'; // Importa il pulsante da React-Bootstrap
import { useLogin} from './components/LoginContext'; // Importiamo il LoginContext
import Footer from './components/Footer.jsx';

function App() {
  log('<App /> rendered');

  const [initialCount, setInitialCount] = useState(0);
  const [isClose, setIsClose] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { login, setLogin } = useLogin(); // Otteniamo il valore di login e la funzione per modificarlo

  useEffect(() => {
    let callCount = 0;
    let timeoutId;
  
    const getData = async () => {
      try {
        const data = await fetchAppData();
        setInitialCount(data.initialCount);
        setIsClose(data.isClose);
        setLastUpdate(data.lastUpdate);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
  
      if (login !== true) {
        callCount++;
        const nextInterval = 5000 * callCount; // Aumenta il tempo progressivamente
  
        timeoutId = setTimeout(getData, nextInterval);
      }
    };
  
    // Prima chiamata immediata
    getData();
  
    return () => clearTimeout(timeoutId); // Pulizia quando il componente si smonta
  }, [login]);

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (error) return (
    <div className="d-flex justify-content-center mt-5">
      <p>Si è verificato un errore, riprova piu tardi.</p>
    </div>
  );


  return (
    <>
      <Header/>
      <main>
        <Counter initialCount={initialCount} isClose={isClose} lastUpdate={lastUpdate} login={login}/>
      </main>
      <div className="d-flex justify-content-center mt-3">
        <Button onClick={() => window.location.reload()} variant="primary">
              Ricarica
        </Button>
      </div>
      <Footer/>
    </>
  );
}

export default App;
