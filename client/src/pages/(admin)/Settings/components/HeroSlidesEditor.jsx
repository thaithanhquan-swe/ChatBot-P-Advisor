import { useState } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getApiErrorMessage } from '@/lib/http';
import { uploadSystemConfigImage } from '@/services/system-config-service';
import { getSystemConfigImageUrl } from '@/contexts/system-config-context';
import SettingsField from './SettingsField';

const newSlide = (displayOrder) => ({ imageUrl: '', eyebrow: '', caption: '', displayOrder });

function HeroSlidesEditor({ slides, disabled, onChange }) {
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const updateSlide = (index, field, value) => {
    onChange(
      slides.map((slide, itemIndex) => (itemIndex === index ? { ...slide, [field]: value } : slide))
    );
  };

  const removeSlide = (index) => {
    onChange(
      slides
        .filter((_, itemIndex) => itemIndex !== index)
        .map((slide, itemIndex) => ({ ...slide, displayOrder: itemIndex + 1 }))
    );
  };

  const uploadImage = async (index, file) => {
    if (!file) return;
    try {
      setUploadingIndex(index);
      const result = await uploadSystemConfigImage(file);
      updateSlide(index, 'imageUrl', result.url);
      toast.success('Đã tải ảnh lên. Nhấn Lưu thay đổi để áp dụng slide.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Không thể tải ảnh lên.'));
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <div className='border-t border-slate-100 pt-6'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <div>
          <h3 className='text-sm font-bold text-slate-800'>Slide ảnh</h3>
          <p className='mt-1 text-xs text-slate-500'>
            Tải ảnh lên hoặc dán URL ảnh; ảnh được lưu trong uploads/system-config.
          </p>
        </div>
        <Button
          type='button'
          variant='outline'
          size='sm'
          disabled={disabled}
          onClick={() => onChange([...slides, newSlide(slides.length + 1)])}
        >
          <ImagePlus size={15} /> Thêm slide
        </Button>
      </div>

      <div className='space-y-4'>
        {slides.map((slide, index) => (
          <article
            key={`${slide.displayOrder}-${index}`}
            className='rounded-lg border border-slate-200 p-4'
          >
            <div className='mb-4 flex items-center justify-between'>
              <span className='text-xs font-bold text-slate-700'>Slide {index + 1}</span>
              <Button
                type='button'
                variant='ghost'
                size='icon-sm'
                disabled={disabled}
                onClick={() => removeSlide(index)}
                aria-label={`Xóa slide ${index + 1}`}
              >
                <Trash2 size={15} className='text-red-600' />
              </Button>
            </div>
            <div className='grid gap-4 md:grid-cols-2'>
              <SettingsField label='Ảnh slide' required>
                <div className='space-y-2'>
                  <Input
                    type='file'
                    accept='image/*'
                    disabled={disabled || uploadingIndex !== null}
                    onChange={(event) => {
                      uploadImage(index, event.target.files?.[0]);
                      event.target.value = '';
                    }}
                  />
                  <Input
                    type='url'
                    value={slide.imageUrl}
                    onChange={(event) => updateSlide(index, 'imageUrl', event.target.value)}
                    disabled={disabled || uploadingIndex !== null}
                    placeholder='URL ảnh sau khi tải lên'
                  />
                  {slide.imageUrl && (
                    <img
                      src={getSystemConfigImageUrl(slide.imageUrl)}
                      alt={`Xem trước slide ${index + 1}`}
                      className='h-28 w-full rounded-md border border-slate-200 object-cover'
                    />
                  )}
                  {uploadingIndex === index && (
                    <p className='text-[11px] text-slate-500'>Đang tải ảnh lên...</p>
                  )}
                </div>
              </SettingsField>
              <SettingsField label='Nhãn ảnh'>
                <Input
                  value={slide.eyebrow ?? ''}
                  onChange={(event) => updateSlide(index, 'eyebrow', event.target.value)}
                  disabled={disabled}
                  placeholder='HỌC VIỆN PTIT'
                />
              </SettingsField>
              <SettingsField label='Caption' required>
                <Input
                  value={slide.caption}
                  onChange={(event) => updateSlide(index, 'caption', event.target.value)}
                  disabled={disabled}
                />
              </SettingsField>
              <SettingsField label='Thứ tự hiển thị' required>
                <Input
                  type='number'
                  min='1'
                  value={slide.displayOrder}
                  onChange={(event) =>
                    updateSlide(index, 'displayOrder', Number(event.target.value))
                  }
                  disabled={disabled}
                />
              </SettingsField>
            </div>
          </article>
        ))}
        {!slides.length && (
          <p className='rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-500'>
            Chưa có slide nào. Thêm slide để hiển thị ảnh ở trang chủ.
          </p>
        )}
      </div>
    </div>
  );
}

export default HeroSlidesEditor;
