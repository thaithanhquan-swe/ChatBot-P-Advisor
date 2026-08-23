import { FileText } from 'lucide-react';

function Documents() {
  return (
    <div className='mx-auto max-w-[1600px]'>
      <div className='rounded-xl border border-slate-200 bg-white p-6'>
        <div className='flex items-center gap-3'>
          <div className='rounded-lg bg-red-50 p-3 text-[#D71920]'>
            <FileText size={24} />
          </div>
          <div>
            <h1 className='text-[26px] font-bold tracking-tight text-slate-900'>Quản lý tài liệu</h1>
            <p className='mt-1 text-[13px] text-slate-500'>Danh sách và quản lý tài liệu của hệ thống.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
