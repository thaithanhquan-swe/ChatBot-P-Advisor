/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/http';
import { getSystemConfig } from '@/services/system-config-service';

const SystemConfigContext = createContext({ config: null, loading: true });

export function getSystemConfigImageUrl(imageUrl) {
  if (
    !imageUrl ||
    imageUrl.startsWith('http://') ||
    imageUrl.startsWith('https://') ||
    imageUrl.startsWith('data:')
  ) {
    return imageUrl;
  }
  if (!API_BASE_URL) return imageUrl;

  // Upload API returns a context-path URL (for example /chatbot-advisor/uploads/...).
  // Resolve it from the backend origin to avoid duplicating the context path.
  if (imageUrl.startsWith('/')) {
    return `${new URL(API_BASE_URL, window.location.origin).origin}${imageUrl}`;
  }

  return `${API_BASE_URL.replace(/\/$/, '')}/${imageUrl}`;
}

export function SystemConfigProvider({ children }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getSystemConfig()
      .then((result) => {
        if (!active || !result) return;
        setConfig(result);
      })
      .catch(() => {
        // Public pages intentionally show no mocked configuration when the API is unavailable.
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return <SystemConfigContext.Provider value={{ config, loading }}>{children}</SystemConfigContext.Provider>;
}

export function useSystemConfig() {
  return useContext(SystemConfigContext);
}
