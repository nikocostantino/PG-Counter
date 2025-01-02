import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Counter2 from './components/Counter/Counter2.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);
  const [isClose, setIsClose] = useState(true);


  function handleSetCounter(newCount){
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        {/*<ConfigureCounter onSet={handleSetCounter}/>
        <Counter2 key={chosenCount} initialCount={chosenCount} />*/}
        <Counter initialCount={chosenCount} isClose={isClose} />
      </main>
    </>
  );
}

export default App;
