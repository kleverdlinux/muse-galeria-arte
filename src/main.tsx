// Punto de entrada principal de la aplicacion React.
// Monta el componente raiz <App /> en el elemento DOM 'root'.
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
