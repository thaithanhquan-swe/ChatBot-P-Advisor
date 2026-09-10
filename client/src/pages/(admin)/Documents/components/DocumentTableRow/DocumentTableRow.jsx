import { Download, Pencil, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { TableCell, TableRow } from '@/components/ui/table';

const statusClass = {
  PUBLISHED: 'border-emerald-200 bg-emerald-50 text-emerald-700',

  DRAFT: 'border-amber-200 bg-amber-50 text-amber-700',

  ARCHIVED: 'border-slate-200 bg-slate-100 text-slate-600',
};

const fileTypeClass = {
  'application/pdf': 'bg-red-50 text-red-600',

  'application/msword': 'bg-blue-50 text-blue-600',

  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'bg-blue-50 text-blue-600',

  'text/plain': 'bg-slate-100 text-slate-600',
};

function DocumentTableRow({ document, onEdit, onDelete, onDownload }) {
  return (
    <TableRow className='border-slate-100'>
      <TableCell>
        {document.description && (
          <p className='mt-1 max-w-[270px] truncate text-[10px] text-slate-400'>
            {document.description}
          </p>
        )}
      </TableCell>

      <TableCell className='text-[11px] text-slate-600'>{document.fileName}</TableCell>

      <TableCell>
        <Badge
          className={`inline-flex rounded-md px-2 py-1 text-[9px] font-bold ${
            fileTypeClass[document.fileType] || 'bg-slate-100 text-slate-600'
          }`}
        >
          {getFileTypeLabel(document.fileType)}
        </Badge>
      </TableCell>

      <TableCell>
        <Badge
          className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-bold ${
            statusClass[document.status] || 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
        >
          {getStatusLabel(document.status)}
        </Badge>
      </TableCell>

      <TableCell className='whitespace-nowrap text-[10px] text-slate-500'>
        {formatDateTime(document.createdAt)}
      </TableCell>

      <TableCell className='whitespace-nowrap text-[10px] text-slate-500'>
        {formatDateTime(document.updatedAt)}
      </TableCell>

      <TableCell>
        <div className='flex justify-end gap-1'>
          <ActionButton title='Chỉnh sửa' onClick={() => onEdit(document)}>
            <Pencil size={14} />
          </ActionButton>

          <ActionButton title='Tải xuống' onClick={() => onDownload(document)}>
            <Download size={14} />
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
      type='button'
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

function getStatusLabel(status) {
  switch (status) {
    case 'PUBLISHED':
      return 'Đã xuất bản';

    case 'DRAFT':
      return 'Bản nháp';

    case 'ARCHIVED':
      return 'Đã lưu trữ';

    default:
      return status;
  }
}

function getFileTypeLabel(fileType) {
  switch (fileType) {
    case 'application/pdf':
      return 'PDF';

    case 'application/msword':
      return 'DOC';

    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'DOCX';

    case 'text/plain':
      return 'TXT';

    default:
      return fileType || '-';
  }
}

function formatDateTime(value) {
  if (!value) return '-';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString('vi-VN');
}

export default DocumentTableRow;
