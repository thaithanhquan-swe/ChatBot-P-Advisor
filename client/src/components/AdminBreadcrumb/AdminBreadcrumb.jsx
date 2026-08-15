import { Home } from 'lucide-react';

function AdminBreadcrumb({ pageTitle }) {
  return (
    <div className='mb-3 flex items-center gap-2 text-[11px] text-slate-400'>
      <Home size={13} />
      <span>Quản trị hệ thống</span>
      <span>›</span>
      <span className='font-semibold text-slate-700'>{pageTitle}</span>
    </div>
  );
}

export default AdminBreadcrumb;
