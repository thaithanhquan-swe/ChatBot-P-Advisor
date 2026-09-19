import { Bot, Mail, Phone, X } from 'lucide-react';

function UserDetailsPanel({ conversation, visible, onClose }) {
  return (
    <>
      {visible && (
        <div
          className='fixed inset-0 z-20 bg-slate-900/20 backdrop-blur-xs xl:hidden'
          onClick={onClose}
          aria-hidden='true'
        />
      )}
      <aside
        className={`${
          visible ? 'flex' : 'hidden'
        } absolute inset-y-0 right-0 z-30 w-72 sm:w-80 max-w-[85vw] min-h-0 flex-col overflow-y-auto border-l border-slate-200 bg-white shadow-xl xl:static xl:z-auto xl:w-auto xl:max-w-none xl:shadow-none`}
      >
        <div className='sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 sm:h-[76px]'>
          <h2 className='text-sm font-semibold text-slate-800'>Thông tin người dùng</h2>
          <button
            type='button'
            onClick={onClose}
            className='flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 xl:hidden'
            aria-label='Đóng thông tin người dùng'
          >
            <X size={18} />
          </button>
        </div>
        <div className='flex-1 p-4 sm:p-5'>
          <div className='flex flex-col items-center border-b border-slate-100 pb-5'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-[#D71920]'>
              {conversation.initials}
            </div>
            <p className='mt-3 text-sm font-semibold text-slate-900'>{conversation.name}</p>
            <p className='mt-1 text-xs text-slate-400'>{conversation.id}</p>
          </div>
          <div className='space-y-4 border-b border-slate-100 py-5'>
            <div className='flex gap-3'>
              <Mail size={16} className='mt-0.5 shrink-0 text-slate-400' />
              <div className='min-w-0'>
                <p className='text-[11px] text-slate-400'>Email</p>
                <p className='mt-0.5 truncate text-xs font-medium text-slate-700'>
                  {conversation.email}
                </p>
              </div>
            </div>
            <div className='flex gap-3'>
              <Phone size={16} className='mt-0.5 shrink-0 text-slate-400' />
              <div>
                <p className='text-[11px] text-slate-400'>Số điện thoại</p>
                <p className='mt-0.5 text-xs font-medium text-slate-700'>{conversation.phone}</p>
              </div>
            </div>
          </div>
          <div className='py-5'>
            <h3 className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
              Thông tin cuộc trò chuyện
            </h3>
            <dl className='mt-4 space-y-3'>
              <div>
                <dt className='text-[11px] text-slate-400'>Chủ đề</dt>
                <dd className='mt-1 text-sm font-medium text-slate-700'>{conversation.topic}</dd>
              </div>
              <div>
                <dt className='text-[11px] text-slate-400'>Hoạt động gần nhất</dt>
                <dd className='mt-1 text-sm text-slate-600'>{conversation.requestedAt}</dd>
              </div>
              <div>
                <dt className='text-[11px] text-slate-400'>Nguồn</dt>
                <dd className='mt-1 flex items-center gap-1.5 text-sm text-slate-600'>
                  <Bot size={15} /> Chatbot tư vấn
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </aside>
    </>
  );
}

export default UserDetailsPanel;
