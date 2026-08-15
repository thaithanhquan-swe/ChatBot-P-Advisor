import { EllipsisVertical, Eye, FileText, Pencil } from 'lucide-react';

function FAQTableRow({ document }) {
  const categoryClass = {
    'Tuyển sinh': 'bg-red-50 text-[#D71920]',
    'Học phí – Học bổng': 'bg-orange-50 text-orange-600',
    'Ngành học': 'bg-blue-50 text-blue-600',
    Khác: 'bg-slate-100 text-slate-600',
  };

  const statusClass = {
    'Đã xuất bản': 'bg-emerald-50 text-emerald-600',
    'Bản nháp': 'bg-orange-50 text-orange-600',
    'Đã lưu trữ': 'bg-red-50 text-red-600',
  };

  return (
    <tr className='border-b border-slate-100 last:border-0 hover:bg-slate-50/50'>
      {/* Title */}
      <td className='px-3 py-3'>
        <div className='flex items-center gap-3'>
          <FileText size={18} strokeWidth={1.7} className='shrink-0 text-slate-700' />

          <div className='min-w-0'>
            <p className='text-[11px] font-medium text-slate-800'>{document.title}</p>

            <p className='mt-1 text-[9px] text-slate-400'>Mã: {document.code}</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className='px-3 py-3'>
        <span
          className={`inline-flex rounded-md px-2 py-1 text-[9px] font-medium ${categoryClass[document.category]}`}
        >
          {document.category}
        </span>
      </td>

      {/* Status */}
      <td className='px-3 py-3'>
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[9px] font-medium ${statusClass[document.status]}`}
        >
          <span className='h-1.5 w-1.5 rounded-full bg-current' />
          {document.status}
        </span>
      </td>

      {/* Views */}
      <td className='px-3 py-3 text-[11px] font-medium text-slate-700'>{document.views}</td>

      {/* Updated */}
      <td className='px-3 py-3'>
        <p className='text-[10px] text-slate-700'>{document.updatedAt}</p>

        <p className='mt-1 text-[9px] text-slate-400'>{document.updatedBy}</p>
      </td>

      {/* Actions */}
      <td className='px-3 py-3'>
        <div className='flex justify-end gap-1'>
          <button
            type='button'
            className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-red-200 hover:text-[#D71920]'
          >
            <Eye size={14} />
          </button>

          <button
            type='button'
            className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-red-200 hover:text-[#D71920]'
          >
            <Pencil size={14} />
          </button>

          <button
            type='button'
            className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-red-200 hover:text-[#D71920]'
          >
            <EllipsisVertical size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default FAQTableRow;
