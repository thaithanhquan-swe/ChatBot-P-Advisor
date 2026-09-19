import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';
import AuthSessionListener from './components/AuthSessionListener';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthSessionListener />
      <Toaster richColors position='top-right' />
      <App />
    </BrowserRouter>
  </StrictMode>
);
