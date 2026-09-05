import { Bot, Mail, Phone } from 'lucide-react';

function UserDetailsPanel({ conversation, visible }) {
  return (
    <aside
      className={`${visible ? 'block' : 'hidden'} absolute inset-y-20 right-0 z-20 w-64 min-h-0 overflow-y-auto border-l border-slate-200 bg-white shadow-lg xl:static xl:w-auto xl:shadow-none`}
    >
      <div className='sticky top-0 z-10 border-b border-slate-200 bg-white px-5 py-[27px]'>
        <h2 className='text-sm font-semibold text-slate-800'>Thông tin người dùng</h2>
      </div>
      <div className='p-5'>
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
            Yêu cầu chuyển tiếp
          </h3>
          <dl className='mt-4 space-y-3'>
            <div>
              <dt className='text-[11px] text-slate-400'>Chủ đề</dt>
              <dd className='mt-1 text-sm font-medium text-slate-700'>{conversation.topic}</dd>
            </div>
            <div>
              <dt className='text-[11px] text-slate-400'>Thời gian yêu cầu</dt>
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
  );
}

export default UserDetailsPanel;
