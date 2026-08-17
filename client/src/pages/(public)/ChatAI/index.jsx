import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ChatHeader from './components/ChatHeader/ChatHeader';
import WelcomeIntro from './components/WelcomeIntro/WelcomeIntro';
import MessageBubble from './components/MessageBubble/MessageBubble';
import TypingIndicator from './components/TypingIndicator/TypingIndicator';
import ChatInput from './components/ChatInput/ChatInput';
import TrustNote from './components/TrustNote/TrustNote';
import { getAnswerFor, nowTime } from '@/data/data';

const MOCK_REPLY_DELAY = 900;
const createMessageId = () => crypto.randomUUID();

function ChatAI() {
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const scrollAnchorRef = useRef(null);

  // Tự động cuộn xuống tin nhắn mới nhất.
  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    const question = text.trim();
    if (!question || isTyping) return;

    setMessages((prev) => [
      ...prev,
      {
        id: createMessageId(),
        role: 'user',
        content: question,
        time: nowTime(),
      },
    ]);
    setInput('');
    setIsTyping(true);

    // Giả lập thời gian chatbot trả lời từ dữ liệu hard-code.
    setTimeout(() => {
      const answer = getAnswerFor(question);

      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId(),
          role: 'assistant',
          ...answer,
        },
      ]);
      setIsTyping(false);
    }, MOCK_REPLY_DELAY);
  };

  // Gửi luôn câu hỏi được chọn từ trang chủ.
  useEffect(() => {
    const prefill = location.state?.prefill;
    if (!prefill) return;

    const timer = setTimeout(() => handleSendMessage(prefill), 0);
    window.history.replaceState({}, document.title);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setActiveConversationId(null);
    setSidebarOpen(false);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    setSidebarOpen(false);
  };

  return (
    <div className='flex h-[calc(100dvh-86px)] w-full overflow-hidden bg-white'>
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((collapsed) => !collapsed)}
        activeId={activeConversationId}
        onSelect={handleSelectConversation}
        onNewChat={handleNewChat}
      />

      <div className='flex min-w-0 flex-1 flex-col'>
        <ChatHeader
          onOpenSidebar={() => setSidebarOpen(true)}
          onNewChat={handleNewChat}
          onClearChat={handleClearChat}
          hasMessages={messages.length > 0}
        />

        <div className='min-h-0 flex-1 overflow-y-auto'>
          {messages.length === 0 ? (
            <WelcomeIntro onPickQuestion={handleSendMessage} />
          ) : (
            <div className='mx-auto flex max-w-160 flex-col gap-5 px-4 py-6 sm:px-6'>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} onFollowUp={handleSendMessage} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={scrollAnchorRef} />
            </div>
          )}
        </div>

        <TrustNote />
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={() => handleSendMessage(input)}
          disabled={isTyping || input.trim().length === 0}
        />
      </div>
    </div>
  );
}

export default ChatAI;
