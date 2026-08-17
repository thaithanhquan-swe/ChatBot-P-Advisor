import { MessageSquareText, Plus, X } from 'lucide-react';
import { conversationHistory } from '@/data/data';

const Sidebar = ({ open, onClose, activeId, onSelect, onNewChat }) => {
  return (
    <>
      {open && (
        <div
          className='fixed inset-0 z-40 bg-black/30 lg:hidden'
          onClick={onClose}
          aria-hidden='true'
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-(--border-subtle) bg-white transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-64 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-4 lg:px-4'>
          <h2 className='text-[13.5px] font-semibold text-gray-900'>Lịch sử hội thoại</h2>
          <button
            type='button'
            onClick={onClose}
            className='rounded-(--radius-card) p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden'
            aria-label='Đóng'
          >
            <X size={18} />
          </button>
        </div>

        <div className='px-4 pb-3 lg:px-4'>
          <button
            type='button'
            onClick={onNewChat}
            className='flex w-full items-center justify-center gap-2 rounded-(--radius-card) bg-(--primary-color) px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:shadow-(--shadow-card-hover)'
          >
            <Plus size={16} strokeWidth={2.2} />
            Cuộc trò chuyện mới
          </button>
        </div>

        <div className='min-h-0 flex-1 overflow-y-auto px-2 pb-4 lg:px-2'>
          {conversationHistory.length === 0 ? (
            <p className='px-3 py-6 text-center text-[13px] text-(--text-tertiary)'>
              Chưa có cuộc hội thoại nào.
            </p>
          ) : (
            <ul className='flex flex-col gap-1'>
              {conversationHistory.map((item) => (
                <li key={item.id}>
                  <button
                    type='button'
                    onClick={() => onSelect(item.id)}
                    className={`flex w-full flex-col items-start gap-0.5 rounded-(--radius-card) px-3 py-2.5 text-left transition-colors ${
                      activeId === item.id
                        ? 'bg-(--primary-color-soft) text-(--primary-color)'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className='line-clamp-1 text-[13px] font-medium'>{item.title}</span>
                    <span className='text-[11.5px] text-(--text-tertiary)'>{item.time}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='flex items-start gap-2.5 border-t border-(--border-subtle) px-4 py-4 lg:px-4'>
          <MessageSquareText size={15} className='mt-0.5 shrink-0 text-(--primary-color)' />
          <p className='text-[11.5px] leading-relaxed text-(--text-secondary)'>
            Trợ lý AI dựa trên dữ liệu tuyển sinh chính thức của PTIT.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
