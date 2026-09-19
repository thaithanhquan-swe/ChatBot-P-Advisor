import { ChevronDown, Search } from 'lucide-react';

function ConversationList({
  conversations,
  selectedId,
  query,
  filter,
  loading,
  onQueryChange,
  onFilterChange,
  onSelect,
  mobileView = 'list',
}) {
  return (
    <aside
      className={`${
        mobileView === 'chat' ? 'hidden lg:flex' : 'flex'
      } min-h-0 flex-col border-b border-slate-200 bg-white lg:border-b-0 lg:border-r`}
    >
      <div className='border-b border-slate-200 bg-slate-50/50 p-3 sm:p-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={17} />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder='Tìm theo tên, chủ đề...'
            className='h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-[#D71920] focus:bg-white focus:ring-2 focus:ring-red-100 sm:h-10'
          />
        </div>
        <div className='relative mt-2.5 sm:mt-3'>
          <select
            value={filter}
            onChange={(event) => onFilterChange(event.target.value)}
            className='h-8.5 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-xs text-slate-600 outline-none focus:border-[#D71920] sm:h-9 sm:text-sm'
          >
            <option value='all'>Tất cả trạng thái</option>
            <option value='bot'>Chatbot đang xử lý</option>
            <option value='waiting'>Đang chờ</option>
            <option value='active'>Đang tư vấn</option>
            <option value='assigned'>Cán bộ khác đang tư vấn</option>
          </select>
          <ChevronDown
            className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400'
            size={15}
          />
        </div>
      </div>
      <div className='min-h-0 flex-1 overflow-y-auto'>
        {conversations.map((item) => (
          <button
            key={item.id}
            type='button'
            onClick={() => onSelect(item.id)}
            className={`w-full border-b border-slate-100 px-3.5 py-3 text-left transition-colors hover:bg-slate-50 sm:px-4 sm:py-4 ${selectedId === item.id ? 'border-l-3 border-l-[#D71920] bg-red-50/70' : 'border-l-3 border-l-transparent'}`}
          >
            <div className='flex gap-3'>
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-11 sm:w-11 ${selectedId === item.id ? 'bg-[#D71920] text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {item.initials}
              </div>
              <div className='min-w-0 flex-1'>
                <div className='flex items-start justify-between gap-2'>
                  <p className='truncate text-sm font-semibold text-slate-800'>{item.name}</p>
                  <span className='shrink-0 text-[11px] text-slate-400'>{item.time}</span>
                </div>
                <p className='mt-0.5 truncate text-xs font-medium text-slate-500'>{item.topic}</p>
                <div className='mt-2 flex items-center justify-between gap-2'>
                  <p className='truncate text-xs text-slate-400'>{item.preview}</p>
                  {item.unread > 0 && (
                    <span className='flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#D71920] px-1 text-[10px] font-bold text-white'>
                      {item.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
        {conversations.length === 0 && (
          <div className='px-6 py-12 text-center text-sm text-slate-400'>
            {loading ? 'Đang tải cuộc trò chuyện...' : 'Không tìm thấy cuộc trò chuyện.'}
          </div>
        )}
      </div>
    </aside>
  );
}

export default ConversationList;
