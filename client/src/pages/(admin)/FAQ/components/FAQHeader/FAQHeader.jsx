import { FolderCog, Plus } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import { Button } from '@/components/ui/button';

function FAQHeader({ onManageCategories, onCreateFaq }) {
  return (
    <div className='mb-5 flex flex-col justify-between gap-4 sm:mb-6 lg:flex-row lg:items-end'>
      <div>
        <AdminBreadcrumb pageTitle='Quản lý FAQ' />
        <h1 className='text-[22px] font-bold tracking-tight text-slate-900 sm:text-[26px]'>Quản lý FAQ</h1>
        <p className='mt-1 max-w-2xl text-[13px] text-slate-500'>
          Quản lý câu hỏi, câu trả lời thường gặp và danh mục FAQ sử dụng trong hệ thống tư vấn
          tuyển sinh.
        </p>
      </div>
      <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap'>
        <Button variant='outline' onClick={onManageCategories} className='w-full sm:w-auto'>
          <FolderCog size={16} /> Quản lý danh mục
        </Button>
        <Button onClick={onCreateFaq} className='w-full sm:w-auto'>
          <Plus size={17} /> Thêm FAQ
        </Button>
      </div>
    </div>
  );
}
export default FAQHeader;
