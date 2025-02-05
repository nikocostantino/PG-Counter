import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import './index.css';
console.error = () => {};
console.warn = () => {};
console.log = () => {};
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
