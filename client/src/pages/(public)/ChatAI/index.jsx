import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ChatHeader from './components/ChatHeader/ChatHeader';
import WelcomeIntro from './components/WelcomeIntro/WelcomeIntro';
import MessageBubble from './components/MessageBubble/MessageBubble';
import TypingIndicator from './components/TypingIndicator/TypingIndicator';
import ChatInput from './components/ChatInput/ChatInput';
import { useChat } from './use-chat';

function ChatAI() {
  const location = useLocation();
  const chat = useChat();
  const [input, setInput] = useState(
    location.state?.initialQuestion || location.state?.prefill || ''
  );
  const [file, setFile] = useState(null);
  const [quotaNotice, setQuotaNotice] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const scrollAnchorRef = useRef(null);
  const busy = chat.loading || !!chat.operation;
  const quotaReached =
    chat.session && !chat.session.userId && chat.session.remainingGuestQuestions <= 0;

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chat.messages, chat.operation]);

  const handleSendMessage = () => {
    if (busy) return;
    if (quotaReached) {
      setQuotaNotice(true);
      return;
    }
    setQuotaNotice(false);
    const message = input;
    const attachment = file;
    setInput('');
    setFile(null);
    void chat.controller.sendMessage(message, attachment);
  };

  const handleNewChat = () => {
    if (!chat.controller.newChat()) return;
    setQuotaNotice(false);
    setInput('');
    setFile(null);
    setSidebarOpen(false);
  };

  const handleSelectConversation = async (token) => {
    if (await chat.controller.selectSession(token)) {
      setQuotaNotice(false);
      setInput('');
      setFile(null);
      setSidebarOpen(false);
    }
  };

  return (
    <div className='flex h-[calc(100dvh-86px)] w-full overflow-hidden bg-white'>
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((collapsed) => !collapsed)}
        activeId={chat.session?.id}
        onSelect={handleSelectConversation}
        onNewChat={handleNewChat}
        history={chat.history}
        loading={chat.loadingHistory}
        error={chat.historyError}
        hasMore={chat.hasMore}
        onLoadMore={() => chat.controller.loadHistory(true)}
        onRetry={() => chat.controller.loadHistory()}
        disabled={busy}
      />
      <div className='flex min-w-0 flex-1 flex-col'>
        <ChatHeader
          onOpenSidebar={() => setSidebarOpen(true)}
          onNewChat={handleNewChat}
          onClearChat={async () => {
            if (await chat.controller.deleteSession()) {
              setInput('');
              setFile(null);
            }
          }}
          hasSession={!!chat.session}
          status={chat.session?.status}
          onRequestAdvisor={() => chat.controller.requestAdvisor()}
          disabled={busy}
        />
        {chat.error && (
          <p role='alert' className='px-4 py-2 text-sm text-red-700'>
            {chat.error}
          </p>
        )}
        {chat.syncError && (
          <div role='status' className='flex items-center gap-2 px-4 py-2 text-sm text-amber-800'>
            <span>Chưa cập nhật được hội thoại: {chat.syncError}</span>
            <button
              type='button'
              disabled={busy}
              onClick={() => chat.controller.refreshSession()}
              className='underline'
            >
              Thử lại
            </button>
          </div>
        )}
        <div className='min-h-0 flex-1 overflow-y-auto' aria-busy={busy}>
          {chat.loading ? (
            <p role='status' className='p-6 text-center text-sm text-gray-500'>
              Đang tải hội thoại...
            </p>
          ) : (
            <>
              {chat.messages.length === 0 && <WelcomeIntro />}
              <div className='mx-auto flex max-w-160 flex-col gap-5 px-4 py-6 sm:px-6'>
                {chat.messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {chat.operation === 'send' &&
                  (chat.session?.status === 'BOT_HANDLING' ? (
                    <TypingIndicator />
                  ) : (
                    <p role='status' className='text-sm text-gray-500'>
                      Đang gửi tin nhắn...
                    </p>
                  ))}
                <div ref={scrollAnchorRef} />
              </div>
            </>
          )}
        </div>
        {chat.session && !chat.session.userId && (
          <p className='px-4 py-2 text-center text-xs text-gray-600'>
            {quotaReached
              ? 'Bạn đã dùng hết lượt hỏi dành cho khách.'
              : `Bạn còn ${chat.session.remainingGuestQuestions} lượt hỏi dành cho khách.`}{' '}
            <Link to='/login' className='font-medium text-(--primary-color) underline'>
              Đăng nhập để tiếp tục
            </Link>
          </p>
        )}
        {quotaNotice && (
          <div
            role='alert'
            className='border-t border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-700'
          >
            Bạn đã sử dụng hết 2 lượt hỏi dành cho khách.{' '}
            <Link to='/login' className='font-semibold underline'>
              Đăng nhập để tiếp tục trò chuyện
            </Link>
            .
          </div>
        )}
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSendMessage}
          disabled={busy}
          file={file}
          onFileChange={setFile}
          placeholder={
            chat.session?.status === 'STAFF_HANDLING'
              ? 'Nhập tin nhắn cho cán bộ tư vấn...'
              : 'Nhập câu hỏi về tuyển sinh PTIT...'
          }
        />
      </div>
    </div>
  );
}

export default ChatAI;
