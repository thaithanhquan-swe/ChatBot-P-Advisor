import { HelpCircle } from 'lucide-react';
import FAQTableRow from '../FAQTableRow/FAQTableRow';

function FAQTable({ faqs, categoryMap, onView, onEdit, onDelete, onStatusChange }) {
  return (
    <section className='min-w-0 rounded-xl border border-slate-200 bg-white'>
      <div className='flex items-center justify-between border-b border-slate-100 px-5 py-4'>
        <div><h2 className='text-[14px] font-bold text-slate-900'>Danh sách FAQ</h2><p className='mt-1 text-[10px] text-slate-400'>Tìm thấy {faqs.length} FAQ phù hợp</p></div>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[1120px] border-collapse'>
          <thead><tr className='border-b border-slate-200 bg-slate-50/80'>{['Câu hỏi','Danh mục','Trạng thái','Người tạo','Ngày tạo','Cập nhật lần cuối','Thao tác'].map((item) => <th key={item} className={`px-4 py-3 text-[10px] font-semibold text-slate-600 ${item === 'Thao tác' ? 'text-right' : 'text-left'}`}>{item}</th>)}</tr></thead>
          <tbody>{faqs.map((faq) => <FAQTableRow key={faq.id} faq={faq} category={categoryMap[faq.categoryId]} onView={onView} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />)}</tbody>
        </table>
        {faqs.length === 0 && <div className='flex flex-col items-center justify-center px-6 py-16 text-center'><HelpCircle size={36} className='mb-3 text-slate-300'/><p className='text-sm font-semibold text-slate-600'>Không tìm thấy FAQ</p><p className='mt-1 text-xs text-slate-400'>Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p></div>}
      </div>
      <div className='flex items-center justify-between border-t border-slate-100 px-5 py-3'><p className='text-[10px] text-slate-500'>Hiển thị {faqs.length} kết quả</p><div className='flex gap-1'>{['‹','1','›'].map((item) => <button key={item} className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${item === '1' ? 'border-[#D71920] bg-[#D71920] text-white' : 'border-slate-200 text-slate-500'}`}>{item}</button>)}</div></div>
    </section>
  );
}
export default FAQTable;
