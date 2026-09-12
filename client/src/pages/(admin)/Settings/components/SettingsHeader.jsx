import { RotateCcw, Save } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import { Button } from '@/components/ui/button';

function SettingsHeader({ dirty, loading, saving, onReset, onSave }) {
  return (
    <div className='mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
      <div>
        <AdminBreadcrumb pageTitle='Nội dung website' />
        <h1 className='text-[26px] font-bold tracking-tight text-slate-900'>Nội dung website</h1>
        <p className='mt-1 text-[13px] text-slate-500'>
          Cập nhật slogan, slide ảnh và thông tin liên hệ hiển thị ở trang công khai.
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='outline' onClick={onReset} disabled={loading || saving || !dirty}>
          <RotateCcw size={15} /> Khôi phục
        </Button>
        <Button onClick={onSave} disabled={loading || saving || !dirty}>
          <Save size={15} /> {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </div>
    </div>
  );
}

export default SettingsHeader;
