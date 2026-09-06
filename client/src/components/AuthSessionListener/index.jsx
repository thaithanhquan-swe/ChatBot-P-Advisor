import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH_SESSION_EXPIRED } from '@/lib/http';

export default function AuthSessionListener() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleExpired = () => {
      if (location.pathname === '/login') return;
      navigate('/login', {
        replace: true,
        state: { from: location, sessionExpired: true },
      });
    };
    window.addEventListener(AUTH_SESSION_EXPIRED, handleExpired);
    return () => window.removeEventListener(AUTH_SESSION_EXPIRED, handleExpired);
  }, [location, navigate]);

  return null;
}
