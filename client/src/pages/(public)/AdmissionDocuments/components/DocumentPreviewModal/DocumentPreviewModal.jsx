import { CalendarDays, Download, FileText } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { formatDate, formatFileSize, getFileTypeLabel } from '../../constants/documents';

const DocumentPreviewModal = ({ document, onClose, onDownload }) => {
  const open = Boolean(document);

  if (!document) return null;

  const typeLabel = document.type || getFileTypeLabel(document.fileType);

  const formattedDate = document.date || formatDate(document.updatedAt || document.createdAt);

  const formattedSize = document.size || formatFileSize(document.fileSize);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className='w-[calc(100vw-2rem)] max-w-xl overflow-hidden rounded-2xl p-0 gap-0'>
        <DialogHeader className='p-6 pb-0 pr-12'>
          <div className='flex gap-3 text-left'>
            <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-(--primary-color)'>
              <FileText size={24} />
            </div>

            <div className='min-w-0'>
              <DialogTitle className='text-[18px] font-bold text-gray-950'>
                {document.title}
              </DialogTitle>

              <DialogDescription className='mt-1.5 flex flex-wrap items-center gap-2 text-[11.5px] text-gray-500'>
                <span className='inline-flex items-center gap-1'>
                  <CalendarDays size={13} />
                  {formattedDate}
                </span>

                <span>•</span>
                <span>{typeLabel}</span>
                <span>•</span>
                <span>{formattedSize}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='mx-6 mt-5 min-w-0 rounded-xl border border-gray-200 bg-gray-50 p-4'>
          <p className='text-[13px] font-normal leading-6 text-gray-700'>
            {document.description || 'Không có mô tả chi tiết cho tài liệu này.'}
          </p>

          {document.fileName && (
            <div className='mt-3 flex min-w-0 items-center gap-2 text-[12px] text-gray-500'>
              <span className='shrink-0 font-medium text-gray-700'>Tên file:</span>

              <span className='min-w-0 flex-1 truncate'>{document.fileName}</span>
            </div>
          )}
        </div>

        <DialogFooter className='mt-6 !mx-0 !mb-0 gap-2 rounded-none px-6 py-4 sm:gap-2'>
          <Button type='button' variant='outline' onClick={onClose} className='h-9 text-[12.5px]'>
            Đóng
          </Button>

          {onDownload && (
            <Button
              type='button'
              onClick={() => {
                onDownload(document);
                onClose();
              }}
              className='h-9 gap-1.5 bg-(--primary-color) text-[12.5px] font-semibold text-white hover:bg-[#b10e28]'
            >
              <Download size={15} />
              Tải xuống tài liệu
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreviewModal;
