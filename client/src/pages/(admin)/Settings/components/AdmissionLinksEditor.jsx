import { Link2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SettingsField from './SettingsField';

function AdmissionLinksEditor({ links, disabled, onChange }) {
  const update = (index, field, value) =>
    onChange(
      links.map((link, itemIndex) => (itemIndex === index ? { ...link, [field]: value } : link))
    );
  const remove = (index) =>
    onChange(
      links
        .filter((_, itemIndex) => itemIndex !== index)
        .map((link, itemIndex) => ({ ...link, displayOrder: itemIndex + 1 }))
    );
  const add = () => onChange([...links, { title: '', url: '', displayOrder: links.length + 1 }]);

  return (
    <div className='border-t border-slate-100 pt-6'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <div>
          <h3 className='text-sm font-bold text-slate-800'>Thông tin tuyển sinh</h3>
          <p className='mt-1 text-xs text-slate-500'>Các link hiển thị ở cột thứ hai của Footer.</p>
        </div>
        <Button type='button' variant='outline' size='sm' disabled={disabled} onClick={add}>
          <Link2 size={15} /> Thêm link
        </Button>
      </div>
      <div className='space-y-3'>
        {links.map((link, index) => (
          <div
            key={`${link.displayOrder}-${index}`}
            className='grid gap-3 rounded-lg border border-slate-200 p-3 md:grid-cols-[1fr_1.5fr_90px_32px]'
          >
            <SettingsField label='Tiêu đề' required>
              <Input
                value={link.title}
                onChange={(event) => update(index, 'title', event.target.value)}
                disabled={disabled}
              />
            </SettingsField>
            <SettingsField label='Đường dẫn' required>
              <Input
                type='url'
                value={link.url}
                onChange={(event) => update(index, 'url', event.target.value)}
                disabled={disabled}
                placeholder='https://...'
              />
            </SettingsField>
            <SettingsField label='Thứ tự' required>
              <Input
                type='number'
                min='1'
                value={link.displayOrder}
                onChange={(event) => update(index, 'displayOrder', Number(event.target.value))}
                disabled={disabled}
              />
            </SettingsField>
            <Button
              type='button'
              variant='ghost'
              size='icon-sm'
              className='self-end'
              disabled={disabled}
              onClick={() => remove(index)}
              aria-label={`Xóa link ${index + 1}`}
            >
              <Trash2 size={15} className='text-red-600' />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdmissionLinksEditor;
