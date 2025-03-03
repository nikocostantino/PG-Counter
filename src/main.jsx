import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginProvider} from './components/LoginContext'; // Importiamo il LoginContext

import App from './App.jsx';
import './index.css';
console.error = () => {};
console.warn = () => {};
console.log = () => {};
ReactDOM.createRoot(document.getElementById('root')).render(
    <LoginProvider>
        <App />    
    </LoginProvider>
);
