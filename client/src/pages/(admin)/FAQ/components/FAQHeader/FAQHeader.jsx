import { FolderCog, Plus } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import { Button } from '@/components/ui/button';

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
        <Button
          variant='outline'
          onClick={onManageCategories}
        >
          <FolderCog size={16} /> Quản lý danh mục
        </Button>
        <Button
          onClick={onCreateFaq}
        >
          <Plus size={17} /> Thêm FAQ
        </Button>
      </div>
    </div>
  );
}
export default FAQHeader;
