import { authStorage } from '@/lib/auth-storage';
import { API_BASE_URL } from '@/lib/http';

const INITIAL_RECONNECT_DELAY = 1_000;
const MAX_RECONNECT_DELAY = 30_000;

function getWebSocketUrl() {
  const url = new URL(API_BASE_URL || '/', window.location.origin);
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  url.pathname = `${url.pathname.replace(/\/$/, '')}/ws/admin-chat`;
  url.search = '';
  url.hash = '';
  return url.toString();
}

export function connectAdminChatSocket({ onEvent, onConnectionChange }) {
  let socket = null;
  let reconnectTimer = null;
  let reconnectAttempt = 0;
  let stopped = false;

  const notifyConnection = (connected) => onConnectionChange?.(connected);

  const scheduleReconnect = () => {
    if (stopped || reconnectTimer !== null) return;
    const delay = Math.min(MAX_RECONNECT_DELAY, INITIAL_RECONNECT_DELAY * 2 ** reconnectAttempt);
    reconnectAttempt += 1;
    reconnectTimer = window.setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, delay);
  };

  const connect = () => {
    if (stopped || socket?.readyState === WebSocket.OPEN) return;
    const token = authStorage.getToken();
    if (!token) {
      notifyConnection(false);
      scheduleReconnect();
      return;
    }

    socket = new WebSocket(getWebSocketUrl());
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ type: 'AUTHENTICATE', token }));
    });
    socket.addEventListener('message', (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'AUTHENTICATED') {
          reconnectAttempt = 0;
          notifyConnection(true);
          onEvent?.(payload);
          return;
        }
        onEvent?.(payload);
      } catch {
        // Ignore malformed server events and keep the connection alive.
      }
    });
    socket.addEventListener('close', () => {
      socket = null;
      notifyConnection(false);
      scheduleReconnect();
    });
    socket.addEventListener('error', () => socket?.close());
  };

  const reconnectWhenOnline = () => {
    if (!socket && reconnectTimer === null) connect();
  };

  window.addEventListener('online', reconnectWhenOnline);
  connect();

  return () => {
    stopped = true;
    window.removeEventListener('online', reconnectWhenOnline);
    if (reconnectTimer !== null) window.clearTimeout(reconnectTimer);
    socket?.close();
    socket = null;
  };
}
