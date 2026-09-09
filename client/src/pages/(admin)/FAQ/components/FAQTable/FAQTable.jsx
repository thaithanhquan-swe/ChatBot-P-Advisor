import { HelpCircle } from 'lucide-react';
import FAQTableRow from '../FAQTableRow/FAQTableRow';

function FAQTable({ faqs,categoryMap,onView,onEdit,onDelete,onStatusChange,page,setPage,totalPages,totalFaqs,pageSize,setPageSize, }) {
  return (
    <section className='min-w-0 rounded-xl border border-slate-200 bg-white'>
      <div className='flex items-center justify-between border-b border-slate-100 px-5 py-4'>
        <div>
          <h2 className='text-[14px] font-bold text-slate-900'>Danh sách FAQ</h2>
          <p className='mt-1 text-[10px] text-slate-400'>Tìm thấy {faqs.length} FAQ phù hợp</p>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[1120px] border-collapse'>
          <thead>
            <tr className='border-b border-slate-200 bg-slate-50/80'>
              {[
                'Câu hỏi',
                'Danh mục',
                'Trạng thái',
                'Người tạo',
                'Ngày tạo',
                'Cập nhật lần cuối',
                'Thao tác',
              ].map((item) => (
                <th
                  key={item}
                  className={`px-4 py-3 text-[10px] font-semibold text-slate-600 ${item === 'Thao tác' ? 'text-right' : 'text-left'}`}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <FAQTableRow
                key={faq.id}
                faq={faq}
                category={categoryMap[faq.faqCategoryId]}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
        {faqs.length === 0 && (
          <div className='flex flex-col items-center justify-center px-6 py-16 text-center'>
            <HelpCircle size={36} className='mb-3 text-slate-300' />
            <p className='text-sm font-semibold text-slate-600'>Không tìm thấy FAQ</p>
            <p className='mt-1 text-xs text-slate-400'>
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
            </p>
          </div>
        )}
      </div>
      <div className='flex items-center justify-between border-t border-slate-100 px-5 py-3'>
        <p className='text-[10px] text-slate-500'>
          Hiển thị{' '}
          {totalFaqs === 0 ? 0 : page * pageSize + 1}
          {' - '}
          {Math.min((page + 1) * pageSize, totalFaqs)}
          {' / '}
          {totalFaqs} FAQ
        </p>

        <div className='flex items-center gap-3'>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0);
            }}
            className='h-7 rounded-md border border-slate-200 px-2 text-[10px] text-slate-600 outline-none'
          >
            <option value={10}>10 / trang</option>
            <option value={20}>20 / trang</option>
            <option value={50}>50 / trang</option>
          </select>

          <div className='flex items-center gap-1'>
            {/* Nút Previous */}
            <button
              type='button'
              disabled={page === 0}
              onClick={() => setPage((current) => current - 1)}
              className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${
                page === 0
                  ? 'cursor-not-allowed border-slate-200 text-slate-300'
                  : 'cursor-pointer border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              ‹
            </button>

            {/* Các số trang */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                type='button'
                onClick={() => setPage(index)}
                className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${
                  page === index
                    ? 'border-[#D71920] bg-[#D71920] text-white'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Nút Next */}
            <button
              type='button'
              disabled={page >= totalPages - 1}
              onClick={() => setPage((current) => current + 1)}
              className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${
                page >= totalPages - 1
                  ? 'cursor-not-allowed border-slate-200 text-slate-300'
                  : 'cursor-pointer border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FAQTable;
