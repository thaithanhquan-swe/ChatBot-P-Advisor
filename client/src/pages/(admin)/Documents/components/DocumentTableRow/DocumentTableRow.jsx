import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

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
    <TableRow className='border-slate-100'>
      <TableCell>
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
      </TableCell>
      <TableCell className='text-[11px] text-slate-600'>{document.fileName}</TableCell>
      <TableCell>
        <Badge
          className={`inline-flex rounded-md px-2 py-1 text-[9px] font-bold ${fileTypeClass[document.fileType] || 'bg-slate-100 text-slate-600'}`}
        >
          {document.fileType}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-bold ${statusClass[document.status] || 'border-slate-200 bg-slate-50 text-slate-600'}`}
        >
          {document.status}
        </Badge>
      </TableCell>
      <TableCell className='whitespace-nowrap text-[10px] text-slate-500'>{document.createdAt}</TableCell>
      <TableCell className='whitespace-nowrap text-[10px] text-slate-500'>{document.updatedAt}</TableCell>
      <TableCell>
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
      </TableCell>
    </TableRow>
  );
}

function ActionButton({ title, onClick, danger = false, children }) {
  return (
    <Button
      title={title}
      onClick={onClick}
      variant={danger ? 'destructive' : 'outline'}
      size='icon'
      className='h-8 w-8'
    >
      {children}
    </Button>
  );
}

export default DocumentTableRow;
