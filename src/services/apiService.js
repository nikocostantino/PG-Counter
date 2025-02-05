export const fetchAppData = async () => {
    try {
      const response = await fetch('https://pino-girimonte.onrender.com/home/app-data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching app data:', error);
      throw error;
    }
  };

  export const postAppData = async (initialCount, isClose) => {
    try {
      const data = { initialCount, isClose };
      const token = localStorage.getItem('authToken');
  
      if (!token) return {error: true}; // Se non c'è il token, non autenticato
      console.log(data)
      const response = await fetch('https://pino-girimonte.onrender.com/home/updateApp-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Passa il token nell'header
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        return {error: true}
      }
      return await response.json();
    } catch (error) {
      console.error('Error posting app data:', error);
      return {error: true}
    }
  };

  export const login = async (username, password) => {
    try {
      const credentials = { username, password };
  
      const response = await fetch('https://pino-girimonte.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }
  
      // Ottieni il token dalla risposta JSON
      const data = await response.json();
      
      if (data.token) {
        // Salva il token nella sessione (o localStorage)
        localStorage.setItem('authToken', data.token);
  
        console.log('Login successful, token saved.');
        return { success: true, token: data.token };
      } else {
        return { success: false, message: 'Token not received from server.' };
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, message: error.message };
    }
  };

  export const logout = () => {
    localStorage.removeItem('authToken');
    console.log('Logged out, token removed.');
  };
  
  export const getToken = () => {
    return localStorage.getItem('authToken');
  };

export const isAuthenticated = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) return false; // Se non c'è il token, non autenticato
  
  try {
    const response = await fetch('https://pino-girimonte.onrender.com/admin/verify-token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Passa il token nell'header
      },
    });
    return await response.json();
  } catch (error) {
    //console.error('Error verifying token:', error);
    return false;
  }
}; 