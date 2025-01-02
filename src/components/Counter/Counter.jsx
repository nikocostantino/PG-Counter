import { useState, memo, useCallback, useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
// memo controlla se sono cambiate le prop, se non sono cambiate non riesegue in componente
// puo essere rimosso ora perchè il ConfigureCounter ora è a parte, prima era dentro APP
const Counter = memo( function Counter({ initialCount, isClose }) {
  log('<Counter /> rendered', 1);

  const [counter, setCounter] = useState(initialCount);
  const [closed, setClosed] = useState(isClose);

  //useCallback per evitare la reicrazione della funzione
  const handleDecrement = useCallback( function handleDecrement() {
    setCounter((prevCounter) => prevCounter>0 ? prevCounter - 1 : prevCounter);
  }, []);

  const handleIncrement = useCallback( function handleIncrement() {
    setCounter((prevCounter) => prevCounter<100 ? prevCounter + 1 : prevCounter);
  }, []);

  

  const handleClose = function handleClose() {
    setClosed(!closed);
    setCounter(0);
  };

  return (
    <section className="counter">
        {closed==false && 
          <>       
          <p className="counter-info">Il numero di persone in fila è:</p>
          <p>
          <IconButton icon={MinusIcon} onClick={handleDecrement}>
            Decrement
          </IconButton>
          <CounterOutput value={counter} />
          <IconButton icon={PlusIcon} onClick={handleIncrement}>
            Increment
          </IconButton> 
          </p>
          <button 
            className="button"
            style={{ display: 'block', margin: '0 auto', marginTop: '1rem' }}
            onClick={handleClose}>
              Chiudi
          </button>
        </>
        }
        {closed==true && 
        <>
          <p className="counter-info">Il salone è chiuso.</p>
          <button 
            className="button"
            style={{ display: 'block', margin: '0 auto', marginTop: '1rem' }}
            onClick={handleClose}>
              Apri
          </button>
        </>} 
     
    </section>
  );
})

export default Counter;
