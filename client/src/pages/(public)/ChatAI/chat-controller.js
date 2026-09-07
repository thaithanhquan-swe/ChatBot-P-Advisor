const SESSION_KEY = 'p_advisor_chat_session';

export function createChatController({ api, storage, isLoggedIn, errorMessage }) {
  let state = {
    session: null,
    messages: [],
    history: [],
    historyPage: -1,
    hasMore: false,
    loadingHistory: false,
    loading: true,
    operation: null,
    error: '',
    historyError: '',
    syncError: '',
  };
  let epoch = 0;
  let historyRequest = 0;
  let active = true;
  let syncing = false;
  const listeners = new Set();
  const update = (patch) => {
    if (!active) return;
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener());
  };
  const current = (version) => active && version === epoch;
  const remember = (session) => {
    if (session) storage.setItem(SESSION_KEY, session.sessionToken);
    else storage.removeItem(SESSION_KEY);
  };
  const acceptSession = (session) => {
    remember(session);
    update({
      session,
      history: [session, ...state.history.filter((item) => item.id !== session.id)],
    });
  };
  const busy = () => state.loading || !!state.operation;

  async function loadHistory(append = false) {
    if (!isLoggedIn()) return;
    if (append && (state.loadingHistory || !state.hasMore)) return;
    const version = epoch;
    const request = ++historyRequest;
    const page = append ? state.historyPage + 1 : 0;
    update({ loadingHistory: true, historyError: '' });
    try {
      const result = await api.getChatHistory(page);
      if (!current(version) || request !== historyRequest) return;
      const items = append ? [...state.history, ...result.content] : result.content;
      update({
        history: [...new Map(items.map((item) => [item.id, item])).values()],
        historyPage: result.pageNumber,
        hasMore: !result.last,
      });
    } catch (error) {
      if (current(version) && request === historyRequest) {
        update({ historyError: errorMessage(error) });
      }
    } finally {
      if (current(version) && request === historyRequest) update({ loadingHistory: false });
    }
  }

  async function readSession(token, attach = false) {
    let session = await api.getChatSession(token);
    if (attach && !session.userId && isLoggedIn()) {
      session = await api.attachChatSession(token);
    }
    const messages = await api.getChatMessages(token);
    return { session, messages };
  }

  async function initialize() {
    active = true;
    const version = ++epoch;
    update({
      loading: true,
      operation: null,
      session: null,
      messages: [],
      history: [],
      historyPage: -1,
      hasMore: false,
      loadingHistory: false,
      error: '',
      syncError: '',
      historyError: '',
    });
    const token = storage.getItem(SESSION_KEY);
    try {
      if (token) {
        const result = await readSession(token, true);
        if (!current(version)) return;
        acceptSession(result.session);
        update({ messages: result.messages });
      }
    } catch (error) {
      if (!current(version)) return;
      if ([401, 403, 404].includes(error.response?.status)) remember(null);
      update({ error: errorMessage(error) });
    } finally {
      if (current(version)) {
        update({ loading: false });
        await loadHistory();
      }
    }
  }

  async function selectSession(token) {
    if (busy()) return false;
    const version = ++epoch;
    update({ loading: true, loadingHistory: false, error: '', syncError: '' });
    try {
      const result = await readSession(token, true);
      if (!current(version)) return false;
      acceptSession(result.session);
      update({ messages: result.messages });
      return true;
    } catch (error) {
      if (current(version)) update({ error: errorMessage(error) });
      return false;
    } finally {
      if (current(version)) update({ loading: false });
    }
  }

  async function ensureSession(title, version) {
    if (state.session) return state.session;
    // Retry a failed restoration before creating a replacement session.
    const savedToken = storage.getItem(SESSION_KEY);
    if (savedToken) {
      const result = await readSession(savedToken, true);
      if (current(version)) {
        acceptSession(result.session);
        update({
          messages: [...result.messages, ...state.messages.filter((message) => message.pending)],
        });
      }
      return result.session;
    }
    const session = await api.createChatSession(title?.slice(0, 255));
    if (current(version)) acceptSession(session);
    return session;
  }

  async function refreshSession() {
    if (busy() || syncing || !state.session) return;
    syncing = true;
    const version = epoch;
    try {
      const result = await readSession(state.session.sessionToken);
      if (current(version) && !busy()) {
        // Preserve the array when polling returns no message changes, avoiding forced scrolling.
        update({
          session: result.session,
          messages:
            JSON.stringify(result.messages) === JSON.stringify(state.messages)
              ? state.messages
              : result.messages,
          syncError: '',
        });
      }
    } catch (error) {
      if (current(version) && !busy()) update({ syncError: errorMessage(error) });
    } finally {
      syncing = false;
    }
  }

  async function sendMessage(content, file) {
    const question = content.trim();
    if (!question || busy()) return false;
    if (state.session && !state.session.userId && state.session.remainingGuestQuestions <= 0) {
      return false;
    }
    const version = ++epoch;
    const pendingId = `pending-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const pendingMessage = {
      id: pendingId,
      sender: isLoggedIn() ? 'USER' : 'GUEST',
      messageType: file ? 'FILE' : 'TEXT',
      content: question,
      fileName: file?.name,
      fileType: file?.type,
      fileSize: file?.size,
      previewUrl: file ? window.URL.createObjectURL(file) : undefined,
      createdAt: new Date().toISOString(),
      pending: true,
    };
    update({
      operation: 'send',
      loadingHistory: false,
      error: '',
      syncError: '',
      messages: [...state.messages, pendingMessage],
    });
    let session;
    try {
      session = await ensureSession(question, version);
      if (!current(version)) return false;
      if (!state.messages.some((message) => message.id === pendingId)) {
        update({ messages: [...state.messages, pendingMessage] });
      }
      const result = await api.sendChatMessage(session.sessionToken, question, file);
      if (!current(version)) return false;
      const messages = [
        ...state.messages.filter((message) => message.id !== pendingId),
        result.userMessage,
        result.botMessage,
      ].filter(Boolean);
      update({ messages: [...new Map(messages.map((item) => [item.id, item])).values()] });
      try {
        const updated = await api.getChatSession(session.sessionToken);
        if (current(version)) acceptSession(updated);
      } catch (error) {
        if (current(version)) update({ syncError: errorMessage(error) });
      }
      return true;
    } catch (error) {
      if (!current(version)) return false;
      update({
        error: errorMessage(error),
        messages: state.messages.map((message) =>
          message.id === pendingId ? { ...message, pending: false, failed: true } : message
        ),
      });
      // The server can save the user message before AI generation fails. Reconcile without resending.
      if (session) {
        try {
          const result = await readSession(session.sessionToken);
          if (current(version)) {
            acceptSession(result.session);
            update({ messages: result.messages });
          }
        } catch (syncError) {
          if (current(version)) update({ syncError: errorMessage(syncError) });
        }
      }
      return false;
    } finally {
      if (current(version)) {
        update({ operation: null });
        void loadHistory();
      }
    }
  }

  async function requestAdvisor() {
    if (busy() || (state.session && state.session.status !== 'BOT_HANDLING')) return;
    const version = ++epoch;
    update({ operation: 'advisor', loadingHistory: false, error: '', syncError: '' });
    try {
      const session = await ensureSession(undefined, version);
      if (!current(version)) return;
      const result = await api.requestStaff(session.sessionToken);
      if (current(version)) acceptSession(result);
    } catch (error) {
      if (current(version)) update({ error: errorMessage(error) });
    } finally {
      if (current(version)) {
        update({ operation: null });
        void loadHistory();
      }
    }
  }

  function newChat() {
    if (busy()) return false;
    ++epoch;
    remember(null);
    update({ session: null, messages: [], error: '', syncError: '', loadingHistory: false });
    return true;
  }

  async function deleteSession() {
    if (busy() || !state.session) return false;
    const version = ++epoch;
    const session = state.session;
    update({ operation: 'delete', loadingHistory: false, error: '' });
    try {
      await api.deleteChatSession(session.sessionToken);
      if (!current(version)) return false;
      remember(null);
      update({
        session: null,
        messages: [],
        syncError: '',
        history: state.history.filter((item) => item.id !== session.id),
      });
      return true;
    } catch (error) {
      if (current(version)) update({ error: errorMessage(error) });
      return false;
    } finally {
      if (current(version)) {
        update({ operation: null });
        void loadHistory();
      }
    }
  }

  return {
    getSnapshot: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    initialize,
    selectSession,
    sendMessage,
    requestAdvisor,
    newChat,
    deleteSession,
    loadHistory,
    refreshSession,
    dispose: () => {
      active = false;
      ++epoch;
    },
  };
}
