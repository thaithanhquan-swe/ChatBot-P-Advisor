import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const statusLabel = {
  PUBLISHED: 'Đã xuất bản',
  DRAFT: 'Bản nháp',
  HIDDEN: 'Đang ẩn',
};

function FaqDetailDialog({ faq, category, onOpenChange }) {
  return (
    <Dialog open={Boolean(faq)} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Chi tiết FAQ</DialogTitle>
          <DialogDescription>
            Thông tin câu hỏi và câu trả lời đang lưu trong hệ thống.
          </DialogDescription>
        </DialogHeader>

        {faq && (
          <div className='space-y-5'>
            <div className='flex flex-wrap gap-2'>
              <Badge className='border-border bg-muted text-foreground'>
                {faq.categoryName || category?.name || 'Chưa có danh mục'}
              </Badge>
              <Badge className='border-border bg-background text-foreground'>
                {statusLabel[faq.status] || faq.status}
              </Badge>
            </div>

            <section className='space-y-2'>
              <h3 className='text-sm font-semibold'>Câu hỏi</h3>
              <p className='whitespace-pre-wrap text-sm leading-6'>{faq.question}</p>
            </section>

            <Separator />

            <section className='space-y-2'>
              <h3 className='text-sm font-semibold'>Câu trả lời</h3>
              <p className='max-h-[45vh] overflow-y-auto whitespace-pre-wrap text-sm leading-6 text-muted-foreground'>
                {faq.answer}
              </p>
            </section>

            <Separator />

            <dl className='grid gap-3 text-xs text-muted-foreground sm:grid-cols-3'>
              <Meta label='Người tạo' value={faq.creatorUsername || faq.createdBy || '—'} />
              <Meta label='Ngày tạo' value={formatDateTime(faq.createdAt)} />
              <Meta label='Cập nhật' value={formatDateTime(faq.updatedAt)} />
            </dl>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd className='mt-1 font-medium text-foreground'>{value}</dd>
    </div>
  );
}

function formatDateTime(value) {
  if (!value) return '—';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default FaqDetailDialog;
