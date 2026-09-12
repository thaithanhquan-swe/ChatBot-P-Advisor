import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SettingsField from './SettingsField';
import HeroSlidesEditor from './HeroSlidesEditor';

function HeroSettingsForm({ config, disabled, onChange }) {
  const setField = (field) => (event) =>
    onChange((current) => ({ ...current, [field]: event.target.value }));

  return (
    <section className='overflow-hidden rounded-lg border border-slate-200 bg-white'>
      <header className='border-b border-slate-200 px-6 py-5'>
        <h2 className='text-base font-bold text-slate-900'>Khu vực giới thiệu</h2>
        <p className='mt-1 text-xs text-slate-500'>Slogan và hình ảnh carousel ở đầu trang chủ.</p>
      </header>
      <div className='space-y-6 p-6'>
        <div className='grid gap-5 md:grid-cols-2'>
          <SettingsField label='Nhãn giới thiệu' required>
            <Input value={config.heroBadge} onChange={setField('heroBadge')} disabled={disabled} />
          </SettingsField>
          <SettingsField label='Tiêu đề dòng 1' required>
            <Input value={config.heroTitle} onChange={setField('heroTitle')} disabled={disabled} />
          </SettingsField>
        </div>
        <SettingsField label='Tiêu đề nhấn mạnh'>
          <Input
            value={config.heroHighlightedTitle}
            onChange={setField('heroHighlightedTitle')}
            disabled={disabled}
          />
        </SettingsField>
        <SettingsField label='Mô tả' required>
          <Textarea
            rows={4}
            value={config.heroDescription}
            onChange={setField('heroDescription')}
            disabled={disabled}
          />
        </SettingsField>
        <HeroSlidesEditor
          slides={config.heroSlides}
          disabled={disabled}
          onChange={(heroSlides) => onChange((current) => ({ ...current, heroSlides }))}
        />
      </div>
    </section>
  );
}

export default HeroSettingsForm;
