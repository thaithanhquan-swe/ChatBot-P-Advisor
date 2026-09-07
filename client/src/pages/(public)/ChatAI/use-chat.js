import { useEffect, useState, useSyncExternalStore } from 'react';
import * as sessions from '@/services/chat-session-service';
import * as messages from '@/services/chat-message-service';
import { authStorage } from '@/lib/auth-storage';
import { AUTH_SESSION_EXPIRED, getApiErrorMessage } from '@/lib/http';
import { createChatController } from './chat-controller';

export function useChat() {
  const [controller] = useState(() =>
    createChatController({
      api: { ...sessions, ...messages },
      storage: sessionStorage,
      isLoggedIn: () => !!authStorage.getToken(),
      errorMessage: getApiErrorMessage,
    })
  );
  const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot);

  useEffect(() => {
    void controller.initialize();
    const refresh = () => {
      if (document.visibilityState === 'visible') void controller.refreshSession();
    };
    const reset = () => {
      void controller.initialize();
    };
    const timer = window.setInterval(refresh, 5000);
    window.addEventListener('focus', refresh);
    window.addEventListener(AUTH_SESSION_EXPIRED, reset);
    return () => {
      controller.dispose();
      window.clearInterval(timer);
      window.removeEventListener('focus', refresh);
      window.removeEventListener(AUTH_SESSION_EXPIRED, reset);
    };
  }, [controller]);

  return { ...state, controller };
}
