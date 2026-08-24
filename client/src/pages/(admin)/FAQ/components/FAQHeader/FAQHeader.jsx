import { FolderCog, Plus } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';

function FAQHeader({ onManageCategories, onCreateFaq }) {
  return (
    <div className='mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
      <div>
        <AdminBreadcrumb pageTitle='Quản lý FAQ' />
        <h1 className='text-[26px] font-bold tracking-tight text-slate-900'>Quản lý FAQ</h1>
        <p className='mt-1 max-w-2xl text-[13px] text-slate-500'>
          Quản lý câu hỏi, câu trả lời thường gặp và danh mục FAQ sử dụng trong hệ thống tư vấn
          tuyển sinh.
        </p>
      </div>
      <div className='flex flex-wrap gap-2'>
        <button
          type='button'
          onClick={onManageCategories}
          className='flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[12px] font-semibold text-slate-700 hover:border-red-200 hover:text-[#D71920]'
        >
          <FolderCog size={16} /> Quản lý danh mục
        </button>
        <button
          type='button'
          onClick={onCreateFaq}
          className='flex h-10 items-center gap-2 rounded-lg bg-[#D71920] px-4 text-[12px] font-semibold text-white hover:bg-[#b9151b]'
        >
          <Plus size={17} /> Thêm FAQ
        </button>
      </div>
    </div>
  );
}
export default FAQHeader;
