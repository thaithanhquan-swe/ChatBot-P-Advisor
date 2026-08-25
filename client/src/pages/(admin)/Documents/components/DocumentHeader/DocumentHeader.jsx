import { Plus } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';

function DocumentHeader({ onCreate }) {
  return (
    <div className='mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
      <div>
        <AdminBreadcrumb pageTitle='Quản lý tài liệu' />
        <h1 className='text-[26px] font-bold tracking-tight text-slate-900'>Quản lý tài liệu</h1>
        <p className='mt-1 max-w-2xl text-[13px] text-slate-500'>
          Lưu trữ và quản lý các tài liệu được sử dụng làm nguồn dữ liệu cho chatbot.
        </p>
      </div>

      <button
        type='button'
        onClick={onCreate}
        className='flex h-10 items-center justify-center gap-2 rounded-lg bg-[#D71920] px-4 text-[12px] font-semibold text-white transition hover:bg-[#b9151b]'
      >
        <Plus size={17} /> Thêm tài liệu
      </button>
    </div>
  );
}

export default DocumentHeader;
