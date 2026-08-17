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

let messageIdCounter = 0;
const nextId = () => {
  messageIdCounter += 1;
  return `m${messageIdCounter}`;
};

function ChatAI() {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const scrollAnchorRef = useRef(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const question = text.trim();
    if (!question || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: 'user', content: question, time: nowTime() },
    ]);
    setInput('');
    setIsTyping(true);

    // Simulated AI latency — swap for a real API call to the /server backend.
    setTimeout(() => {
      const answer = getAnswerFor(question);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          blocks: answer.blocks,
          source: answer.source,
          followUps: answer.followUps,
          isFallback: answer.isFallback,
          time: answer.time,
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  // Arriving from a "popular question" card on the Home page sends the
  // question straight away instead of just filling the input.
  useEffect(() => {
    const prefill = location.state?.prefill;
    if (prefill) {
      sendMessage(prefill);
      window.history.replaceState({}, document.title);
    }
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
    // In a real app this would fetch and load the conversation's messages.
    setActiveConversationId(id);
    setSidebarOpen(false);
  };

  return (
    <div className='flex h-[calc(100dvh-86px)] w-full overflow-hidden bg-white'>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
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
            <WelcomeIntro onPickQuestion={sendMessage} />
          ) : (
            <div className='mx-auto flex max-w-160 flex-col gap-5 px-4 py-6 sm:px-6'>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} onFollowUp={sendMessage} />
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
          onSubmit={() => sendMessage(input)}
          disabled={isTyping || input.trim().length === 0}
        />
      </div>
    </div>
  );
}

export default ChatAI;
