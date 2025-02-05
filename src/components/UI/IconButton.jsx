import { memo } from 'react';
import { log } from '../../log.js';

const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log('<IconButton /> rendered', 2);
  const Icon = icon;
  return (
    <button
      {...props}
      className="button"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '15vw',  // Adatta la larghezza allo schermo
        height: '10vh',  // Adatta l'altezza allo schermo
        minWidth: '100px', // Imposta una larghezza minima per evitare pulsanti troppo piccoli
        minHeight: '50px',
      }}
    >
      <Icon className="button-icon" style={{ fontSize: '3vw' }} />
      <span className="button-text" style={{ fontSize: '1.5vw' }}>{children}</span>
    </button>

  );
});

export default IconButton;