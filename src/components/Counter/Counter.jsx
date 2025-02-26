import { useState, memo, useCallback, useMemo, useEffect } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import { postAppData } from '../../services/apiService';
import { useLogin } from '../LoginContext'; // Importiamo il contesto

// memo controlla se sono cambiate le prop, se non sono cambiate non riesegue in componente
// puo essere rimosso ora perchè il ConfigureCounter ora è a parte, prima era dentro APP
const Counter = function Counter({ initialCount, isClose, lastUpdate}) {



  log('<Counter /> rendered', 1);
  const { login, setLogin } = useLogin(); // Otteniamo il valore di login e la funzione per modificarlo

  const [counter, setCounter] = useState(initialCount);
  const [closed, setClosed] = useState(isClose);
  const [lastUpdateDate, setLastUpdateDate] = useState(lastUpdate);
  const [error, setError] = useState(null);  // New state to manage errors


  useEffect(() => {
    setClosed(isClose);
    setCounter(initialCount);
    setLastUpdateDate(lastUpdate);
  }, [initialCount, isClose, lastUpdate]);


  // Function to handle API data posting and error handling
  const postData = async (newCounter, isClose) => {
    try {
      console.log('Data posted :', newCounter);

      const response = await postAppData(newCounter, isClose);
      console.log('Data posted successfully:', response);
      response.error==true? setError("Si è verificato un errore.") : setError(null);
      setCounter(response.initialCount);
    } catch (error) {
      console.error('Error posting data:', error);
      setError('Si è verificato un errore.');  // Set error state
      return newCounter;
    }
  };

  const handleDecrement = () => {
    const newCounter = counter > 0 ? counter - 1 : counter;
    postData(newCounter, closed);  // Call postAppData after updating the counter
  };

  const handleIncrement = () => {
    const newCounter = counter < 100 ? counter + 1 : counter;
    console.log('newCounter:', newCounter);
    postData(newCounter, closed);  // Call postAppData after updating the counter
  };

  const handleClose = () => {
    setClosed(!closed);
    postData(0, !closed);  // Post data with counter 0 and the new closed state
  };

  return (
    <section className="counter">
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px', margin: '0 auto', textAlign: 'center'}}>
          {error}
        </div>
      )}
      {closed === false && !error && (
        <>
          <p className="counter-info">Il numero di persone in fila è:</p>
          <p style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center', // Centra gli elementi
            gap: '30px', // Spazio tra gli elementi
            textAlign: 'center'
          }}>
            {login === true && <IconButton icon={MinusIcon} onClick={handleDecrement} style={{ flex: '1 1 100px', textAlign: 'center' }}>
              Decrementa
            </IconButton>}
            <CounterOutput value={counter} style={{ flex: '1 1 100px', textAlign: 'center' }}/>
            {login === true && <IconButton icon={PlusIcon} onClick={handleIncrement} style={{ flex: '1 1 100px', textAlign: 'center' }}>
              Incrementa
            </IconButton>}
          </p>
          {login !== true && <p className="counter-info" style={{ marginTop: '1rem' }}>{lastUpdateDate}</p>}
          {login === true && <button
            className="button"
            style={{ justifyContent: 'center', display: 'block', margin: '0 auto', marginTop: '1rem' }}
            onClick={handleClose}
          >
            Chiudi salone
          </button>}
        </>
      )}
      {closed === true && (
        <>
          <p className="counter-info">Il salone è chiuso.</p>
          {login === true && <button
            className="button"
            style={{justifyContent: 'center', display: 'block', margin: '0 auto', marginTop: '1rem' }}
            onClick={handleClose}
          >
            Apri salone
          </button>}
        </>
      )}
    </section>
  );
};

export default Counter;
