import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getApiErrorMessage } from '@/lib/http';
import { getChatMessages, sendStaffMessage } from '@/services/chat-message-service';
import {
  assignChatSession,
  getRegisteredUserChatSessions,
  returnChatSessionToBot,
} from '@/services/chat-session-service';
import { getCurrentUser } from '@/services/user-service';
import { connectAdminChatSocket } from '@/services/chat-realtime-service';
import AdvisorInboxHeader from './components/AdvisorInboxHeader/AdvisorInboxHeader';
import ConversationList from './components/ConversationList/ConversationList';
import ConversationPanel from './components/ConversationPanel/ConversationPanel';
import UserDetailsPanel from './components/UserDetailsPanel/UserDetailsPanel';

function formatTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' }).format(date);
}

function formatRequestedAt(value) {
  if (!value) return 'Chưa xác định';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Chưa xác định';
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (parts.length > 1 ? `${parts[0][0]}${parts.at(-1)[0]}` : name.slice(0, 2)).toUpperCase();
}

function mapMessage(item) {
  const sender =
    item.messageType === 'SYSTEM'
      ? 'system'
      : item.sender === 'STAFF'
        ? 'advisor'
        : item.sender === 'BOT'
          ? 'bot'
          : 'user';
  return {
    id: item.id,
    sender,
    text: item.content,
    time: formatTime(item.createdAt),
    fileName: item.fileName,
    fileUrl: item.fileUrl,
    fileType: item.fileType,
    fileSize: item.fileSize,
  };
}

function mapSession(session, current, currentStaffId) {
  const name = session.username || session.userEmail || 'Người dùng';
  const status =
    session.status === 'BOT_HANDLING'
      ? 'bot'
      : session.status === 'WAITING_FOR_STAFF'
        ? 'waiting'
        : session.assignedStaffId === currentStaffId
          ? 'active'
          : 'assigned';
  return {
    id: session.id,
    sessionToken: session.sessionToken,
    name,
    initials: getInitials(name),
    email: session.userEmail || 'Không có email',
    phone: session.userPhone || 'Không có số điện thoại',
    topic: session.title || 'Cuộc trò chuyện mới',
    status,
    unread: 0,
    time: formatTime(session.updatedAt),
    requestedAt: formatRequestedAt(session.updatedAt),
    preview: current?.preview || 'Nhấn để xem nội dung trò chuyện',
    messages: current?.messages || [],
  };
}

function AdvisorInbox() {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [action, setAction] = useState(null);
  const [error, setError] = useState('');
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const selectedConversationRef = useRef(null);

  const loadConversations = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    try {
      const [page, currentUser] = await Promise.all([
        getRegisteredUserChatSessions(0, 100),
        getCurrentUser(),
      ]);
      const sessions = page?.content || [];
      setConversations((currentItems) => {
        const currentById = new Map(currentItems.map((item) => [item.id, item]));
        return sessions.map((session) =>
          mapSession(session, currentById.get(session.id), currentUser.id)
        );
      });
      setSelectedId((currentId) =>
        currentId && sessions.some((session) => session.id === currentId)
          ? currentId
          : sessions[0]?.id || null
      );
      if (!silent) setError('');
    } catch (requestError) {
      if (!silent) setError(getApiErrorMessage(requestError, 'Không thể tải danh sách tin nhắn.'));
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  const loadMessages = useCallback(async (conversation, { silent = false } = {}) => {
    if (!conversation) return;
    if (!silent) setLoadingMessages(true);
    try {
      const response = await getChatMessages(conversation.sessionToken);
      const messages = response.map(mapMessage);
      const latest = messages.at(-1);
      setConversations((items) =>
        items.map((item) =>
          item.id === conversation.id
            ? {
                ...item,
                messages,
                preview: latest?.text || latest?.fileName || 'Chưa có tin nhắn',
                time: latest?.time || item.time,
              }
            : item
        )
      );
      if (!silent) setError('');
    } catch (requestError) {
      if (!silent) setError(getApiErrorMessage(requestError, 'Không thể tải nội dung trò chuyện.'));
    } finally {
      if (!silent) setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    const initialTimer = window.setTimeout(loadConversations, 0);
    return () => window.clearTimeout(initialTimer);
  }, [loadConversations]);

  const selectedConversation = conversations.find((item) => item.id === selectedId) || null;
  const selectedSessionToken = selectedConversation?.sessionToken;

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  useEffect(() => {
    if (!selectedId || !selectedSessionToken) return undefined;
    const conversation = { id: selectedId, sessionToken: selectedSessionToken };
    const initialTimer = window.setTimeout(() => loadMessages(conversation), 0);
    return () => window.clearTimeout(initialTimer);
  }, [loadMessages, selectedId, selectedSessionToken]);

  useEffect(
    () =>
      connectAdminChatSocket({
        onConnectionChange: setRealtimeConnected,
        onEvent: (event) => {
          void loadConversations({ silent: true });
          const selected = selectedConversationRef.current;
          if (selected && (!event.sessionId || event.sessionId === selected.id)) {
            void loadMessages(selected, { silent: true });
          }
        },
      }),
    [loadConversations, loadMessages]
  );

  const filteredConversations = useMemo(
    () =>
      conversations.filter((item) => {
        const keyword = query.trim().toLowerCase();
        const matchesQuery =
          !keyword ||
          [item.name, item.topic, item.email].some((value) =>
            value.toLowerCase().includes(keyword)
          );
        return matchesQuery && (filter === 'all' || item.status === filter);
      }),
    [conversations, filter, query]
  );

  const waitingCount = conversations.filter((item) => item.status === 'waiting').length;

  const handleSelectConversation = (id) => {
    setSelectedId(id);
    setMessage('');
    setFile(null);
    setError('');
  };

  const handleAssign = async () => {
    if (!selectedConversation || action) return;
    setAction('assign');
    try {
      const session = await assignChatSession(selectedConversation.id);
      setConversations((items) =>
        items.map((item) =>
          item.id === session.id
            ? { ...mapSession(session, item, session.assignedStaffId), messages: item.messages }
            : item
        )
      );
      setError('');
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Không thể nhận phiên tư vấn này.'));
      await loadConversations({ silent: true });
    } finally {
      setAction(null);
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const text = message.trim();
    if (
      (!text && !file) ||
      !selectedConversation ||
      selectedConversation.status !== 'active' ||
      action
    )
      return;
    setAction('send');
    try {
      const savedMessage = mapMessage(await sendStaffMessage(selectedConversation.id, text, file));
      setConversations((items) =>
        items.map((item) =>
          item.id === selectedConversation.id
            ? {
                ...item,
                preview: savedMessage.text || savedMessage.fileName,
                time: savedMessage.time,
                messages: [
                  ...item.messages.filter((entry) => entry.id !== savedMessage.id),
                  savedMessage,
                ],
              }
            : item
        )
      );
      setMessage('');
      setFile(null);
      setError('');
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Không thể gửi tin nhắn.'));
    } finally {
      setAction(null);
    }
  };

  const handleEndConsultation = async () => {
    if (!selectedConversation || selectedConversation.status !== 'active' || action) return;
    setAction('close');
    try {
      const session = await returnChatSessionToBot(selectedConversation.id);
      setConversations((items) =>
        items.map((item) =>
          item.id === session.id
            ? { ...mapSession(session, item, null), messages: item.messages }
            : item
        )
      );
      setMessage('');
      setFile(null);
      setError('');
      await loadConversations({ silent: true });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Không thể kết thúc phiên tư vấn.'));
    } finally {
      setAction(null);
    }
  };

  return (
    <div className='-mx-3 flex min-h-0 w-[calc(100%+1.5rem)] flex-1 flex-col'>
      <AdvisorInboxHeader
        waitingCount={waitingCount}
        loading={loading}
        realtimeConnected={realtimeConnected}
        onRefresh={() => loadConversations()}
      />
      {error && (
        <div
          className='mb-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700'
          role='alert'
        >
          {error}
        </div>
      )}
      <div
        className={`relative grid min-h-0 flex-1 grid-cols-[240px_minmax(0,1fr)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm 2xl:grid-cols-[280px_minmax(0,1fr)] ${showDetails ? 'xl:grid-cols-[240px_minmax(0,1fr)_260px] 2xl:grid-cols-[280px_minmax(0,1fr)_280px]' : ''}`}
      >
        <ConversationList
          conversations={filteredConversations}
          selectedId={selectedConversation?.id}
          query={query}
          filter={filter}
          loading={loading}
          onQueryChange={setQuery}
          onFilterChange={setFilter}
          onSelect={handleSelectConversation}
        />
        {selectedConversation ? (
          <>
            <ConversationPanel
              conversation={selectedConversation}
              message={message}
              file={file}
              loadingMessages={loadingMessages}
              action={action}
              onMessageChange={setMessage}
              onFileChange={setFile}
              onSend={handleSendMessage}
              onAssign={handleAssign}
              onEndConsultation={handleEndConsultation}
              onToggleDetails={() => setShowDetails((value) => !value)}
            />
            <UserDetailsPanel conversation={selectedConversation} visible={showDetails} />
          </>
        ) : (
          <div className='flex min-h-[500px] items-center justify-center text-sm text-slate-400 lg:col-span-2'>
            <p>{loading ? 'Đang tải tin nhắn...' : 'Chưa có cuộc trò chuyện của người dùng.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvisorInbox;
