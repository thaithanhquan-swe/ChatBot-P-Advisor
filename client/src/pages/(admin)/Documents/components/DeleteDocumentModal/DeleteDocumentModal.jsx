import { AlertTriangle, Loader2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

function DeleteDocumentModal({ document, onClose, onConfirm, loading }) {
  return (
    <AlertDialog
      open={Boolean(document)}
      onOpenChange={(open) => {
        if (!open && !loading) {
          onClose();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-red-50'>
            <AlertTriangle size={20} className='text-[#D71920]' />
          </div>

          <AlertDialogTitle>Xóa tài liệu</AlertDialogTitle>

          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa{' '}
            <span className='font-semibold text-slate-700'>“{document?.title}”</span>? Hành động này
            không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(event) => {
              event.preventDefault();

              onConfirm(document);
            }}
            className='bg-[#D71920] hover:bg-[#b9151b]'
          >
            {loading && <Loader2 size={15} className='mr-2 animate-spin' />}
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDocumentModal;
