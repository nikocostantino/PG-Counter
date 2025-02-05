import React, { createContext, useState, useEffect, useContext } from 'react';
import { isAuthenticated as checkAuth} from '../services/apiService';

// Creiamo il Context per il login
const LoginContext = createContext();

// Forniamo il contesto ai componenti
export function LoginProvider({ children }) {
  const [login, setLogin] = useState(false); // Stato iniziale: non autenticato
  const [loading, setLoading] = useState(true); // Stato per il caricamento

  useEffect(() => {
    const verifyAuthentication = async () => {
      setLoading(true); // Inizio del caricamento
      const authStatus = await checkAuth(); // Interroga il backend
      setLogin(authStatus); // Aggiorna lo stato del login
      setLoading(false); // Fine del caricamento
    };

    verifyAuthentication(); // Verifica al montaggio del provider
  }, []);

  return (
    <LoginContext.Provider value={{ login, setLogin, loading }}>
      {children}
    </LoginContext.Provider>
  );
}

// Hook per accedere al contesto di login
export function useLogin() {
  return useContext(LoginContext);
}
