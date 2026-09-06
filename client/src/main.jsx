import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';
import AuthSessionListener from './components/AuthSessionListener';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthSessionListener />
      <App />
    </BrowserRouter>
  </StrictMode>
);
