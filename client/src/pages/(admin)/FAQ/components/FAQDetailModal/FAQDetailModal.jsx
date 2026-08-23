import ModalShell from '../ModalShell/ModalShell';
function FAQDetailModal({ faq, category, onClose }) {
  return (
    <ModalShell open={Boolean(faq)} onClose={onClose} title='Chi tiết FAQ' description='Thông tin đầy đủ của câu hỏi và câu trả lời.'>
      {faq && <div className='space-y-5 p-6'>
        <div><p className='text-[10px] font-semibold uppercase tracking-wide text-slate-400'>Câu hỏi</p><p className='mt-2 text-sm font-semibold leading-6 text-slate-900'>{faq.question}</p></div>
        <div className='rounded-xl bg-slate-50 p-4'><p className='text-[10px] font-semibold uppercase tracking-wide text-slate-400'>Câu trả lời</p><p className='mt-2 whitespace-pre-wrap text-xs leading-6 text-slate-700'>{faq.answer}</p></div>
        <div className='grid grid-cols-2 gap-4 text-xs sm:grid-cols-3'><Info label='Danh mục' value={category?.name ?? '—'}/><Info label='Trạng thái' value={faq.status}/><Info label='Người tạo' value={faq.creator}/><Info label='Ngày tạo' value={faq.createdAt}/><Info label='Cập nhật lần cuối' value={faq.updatedAt}/></div>
        <div className='flex justify-end border-t border-slate-100 pt-5'><button onClick={onClose} className='h-10 rounded-lg bg-slate-900 px-5 text-xs font-semibold text-white'>Đóng</button></div>
      </div>}
    </ModalShell>
  );
}
function Info({ label, value }) { return <div><p className='text-[10px] text-slate-400'>{label}</p><p className='mt-1 font-medium text-slate-700'>{value}</p></div>; }
export default FAQDetailModal;
