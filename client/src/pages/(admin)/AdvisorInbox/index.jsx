import { useMemo, useState } from 'react';
import AdvisorInboxHeader from './components/AdvisorInboxHeader/AdvisorInboxHeader';
import ConversationList from './components/ConversationList/ConversationList';
import ConversationPanel from './components/ConversationPanel/ConversationPanel';
import UserDetailsPanel from './components/UserDetailsPanel/UserDetailsPanel';
import { INITIAL_CONVERSATIONS } from './constants/inbox';

function AdvisorInbox() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState(INITIAL_CONVERSATIONS[0].id);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false);

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

  const selectedConversation =
    conversations.find((item) => item.id === selectedId) || filteredConversations[0];
  const waitingCount = conversations.filter((item) => item.status === 'waiting').length;

  const handleSelectConversation = (id) => {
    setSelectedId(id);
    setConversations((items) =>
      items.map((item) => (item.id === id ? { ...item, unread: 0 } : item))
    );
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text || !selectedConversation || selectedConversation.status === 'closed') return;

    const time = new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    setConversations((items) =>
      items.map((item) =>
        item.id === selectedConversation.id
          ? {
              ...item,
              status: 'active',
              preview: text,
              time,
              messages: [...item.messages, { id: Date.now(), sender: 'advisor', text, time }],
            }
          : item
      )
    );
    setMessage('');
  };

  const handleToggleClosed = () => {
    if (!selectedConversation) return;
    setConversations((items) =>
      items.map((item) =>
        item.id === selectedConversation.id
          ? { ...item, status: item.status === 'closed' ? 'active' : 'closed' }
          : item
      )
    );
  };

  return (
    <div className='-mx-3 flex min-h-0 w-[calc(100%+1.5rem)] flex-1 flex-col'>
      <AdvisorInboxHeader waitingCount={waitingCount} />
      <div className={`relative grid min-h-0 flex-1 grid-cols-[240px_minmax(0,1fr)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm 2xl:grid-cols-[280px_minmax(0,1fr)] ${showDetails ? 'xl:grid-cols-[240px_minmax(0,1fr)_260px] 2xl:grid-cols-[280px_minmax(0,1fr)_280px]' : ''}`}>
        <ConversationList
          conversations={filteredConversations}
          selectedId={selectedConversation?.id}
          query={query}
          filter={filter}
          onQueryChange={setQuery}
          onFilterChange={setFilter}
          onSelect={handleSelectConversation}
        />
        {selectedConversation ? (
          <>
            <ConversationPanel
              conversation={selectedConversation}
              message={message}
              onMessageChange={setMessage}
              onSend={handleSendMessage}
              onToggleClosed={handleToggleClosed}
              onToggleDetails={() => setShowDetails((value) => !value)}
            />
            <UserDetailsPanel conversation={selectedConversation} visible={showDetails} />
          </>
        ) : (
          <div className='flex min-h-[500px] items-center justify-center text-sm text-slate-400 lg:col-span-2'>
            <p>Chọn một cuộc trò chuyện để xem nội dung.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvisorInbox;
