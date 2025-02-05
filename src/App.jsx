import { useState, useEffect } from 'react';
import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import { fetchAppData } from './services/apiService';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'; // Importa il pulsante da React-Bootstrap
import { LoginProvider} from './components/LoginContext'; // Importiamo il LoginContext

function App() {
  log('<App /> rendered');

  const [initialCount, setInitialCount] = useState(0);
  const [isClose, setIsClose] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAppData();
        setInitialCount(data.initialCount);
        setIsClose(data.isClose);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Inizializza i dati quando il componente è montato
    getData();
    
  }, []);

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
    <LoginProvider>
      <Header/>
      <main>
        <Counter initialCount={initialCount} isClose={isClose}/>
      </main>
      <div className="d-flex justify-content-center mt-5">
        <Button onClick={() => window.location.reload()} variant="primary">
              Ricarica
        </Button>
      </div>
    </LoginProvider>
  );
}

export default App;
