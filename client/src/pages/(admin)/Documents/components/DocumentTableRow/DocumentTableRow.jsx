import { Eye, Pencil, Trash2 } from 'lucide-react';

const statusClass = {
  ACTIVE: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  INACTIVE: 'border-slate-200 bg-slate-100 text-slate-600',
  PROCESSING: 'border-amber-200 bg-amber-50 text-amber-700',
  FAILED: 'border-red-200 bg-red-50 text-red-700',
};

const fileTypeClass = {
  PDF: 'bg-red-50 text-red-600',
  DOCX: 'bg-blue-50 text-blue-600',
  TXT: 'bg-slate-100 text-slate-600',
};

function DocumentTableRow({ document, onView, onEdit, onDelete }) {
  return (
    <tr className='border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50/60'>
      <td className='px-4 py-4'>
        <button
          type='button'
          onClick={() => onView(document)}
          className='max-w-[270px] text-left text-[12px] font-semibold text-slate-800 transition hover:text-[#D71920] hover:underline'
        >
          {document.title}
        </button>
        {document.description && (
          <p className='mt-1 max-w-[270px] truncate text-[10px] text-slate-400'>
            {document.description}
          </p>
        )}
      </td>
      <td className='px-4 py-4 text-[11px] text-slate-600'>{document.fileName}</td>
      <td className='px-4 py-4'>
        <span
          className={`inline-flex rounded-md px-2 py-1 text-[9px] font-bold ${fileTypeClass[document.fileType] || 'bg-slate-100 text-slate-600'}`}
        >
          {document.fileType}
        </span>
      </td>
      <td className='px-4 py-4'>
        <span
          className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-bold ${statusClass[document.status] || 'border-slate-200 bg-slate-50 text-slate-600'}`}
        >
          {document.status}
        </span>
      </td>
      <td className='whitespace-nowrap px-4 py-4 text-[10px] text-slate-500'>{document.createdAt}</td>
      <td className='whitespace-nowrap px-4 py-4 text-[10px] text-slate-500'>{document.updatedAt}</td>
      <td className='px-4 py-4'>
        <div className='flex justify-end gap-1'>
          <ActionButton title='Xem chi tiết' onClick={() => onView(document)}>
            <Eye size={14} />
          </ActionButton>
          <ActionButton title='Chỉnh sửa' onClick={() => onEdit(document)}>
            <Pencil size={14} />
          </ActionButton>
          <ActionButton danger title='Xóa' onClick={() => onDelete(document)}>
            <Trash2 size={14} />
          </ActionButton>
        </div>
      </td>
    </tr>
  );
}

function ActionButton({ title, onClick, danger = false, children }) {
  return (
    <button
      type='button'
      title={title}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
        danger
          ? 'border-red-100 text-red-500 hover:bg-red-50'
          : 'border-slate-200 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-[#D71920]'
      }`}
    >
      {children}
    </button>
  );
}

export default DocumentTableRow;
