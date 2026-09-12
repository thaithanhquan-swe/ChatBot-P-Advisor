import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SettingsField from './SettingsField';
import AdmissionLinksEditor from './AdmissionLinksEditor';

function ContactSettingsForm({ config, disabled, onChange }) {
  const setField = (field) => (event) =>
    onChange((current) => ({ ...current, [field]: event.target.value }));
  return (
    <section className='overflow-hidden rounded-lg border border-slate-200 bg-white'>
      <header className='border-b border-slate-200 px-6 py-5'>
        <h2 className='text-base font-bold text-slate-900'>Liên hệ và Footer</h2>
        <p className='mt-1 text-xs text-slate-500'>
          Thông tin hiển thị tại khối hỗ trợ và chân trang.
        </p>
      </header>
      <div className='grid gap-5 p-6 md:grid-cols-2'>
        <div className='md:col-span-2'>
          <SettingsField label='Giới thiệu Footer' required>
            <Textarea
              rows={3}
              value={config.footerAboutDescription}
              onChange={setField('footerAboutDescription')}
              disabled={disabled}
            />
          </SettingsField>
        </div>
        <SettingsField label='Hotline tuyển sinh' required>
          <Input
            value={config.admissionHotline}
            onChange={setField('admissionHotline')}
            disabled={disabled}
          />
        </SettingsField>
        <SettingsField label='Email tuyển sinh' required>
          <Input
            type='email'
            value={config.admissionEmail}
            onChange={setField('admissionEmail')}
            disabled={disabled}
          />
        </SettingsField>
        <SettingsField label='Website' required>
          <Input
            type='url'
            value={config.websiteUrl}
            onChange={setField('websiteUrl')}
            disabled={disabled}
          />
        </SettingsField>
        <SettingsField label='Facebook' required>
          <Input
            type='url'
            value={config.facebookUrl}
            onChange={setField('facebookUrl')}
            disabled={disabled}
          />
        </SettingsField>
        <SettingsField label='Điện thoại Footer' required>
          <Input
            value={config.footerPhone}
            onChange={setField('footerPhone')}
            disabled={disabled}
          />
        </SettingsField>
        <SettingsField label='Email Footer' required>
          <Input
            type='email'
            value={config.footerEmail}
            onChange={setField('footerEmail')}
            disabled={disabled}
          />
        </SettingsField>
        <div className='md:col-span-2'>
          <SettingsField label='Địa chỉ Footer' required>
            <Input
              value={config.footerAddress}
              onChange={setField('footerAddress')}
              disabled={disabled}
            />
          </SettingsField>
        </div>
        <SettingsField label='Giờ làm việc Thứ 2 – Thứ 6' required>
          <Input
            value={config.weekdayWorkingHours}
            onChange={setField('weekdayWorkingHours')}
            disabled={disabled}
          />
        </SettingsField>
        <SettingsField label='Giờ làm việc Thứ 7' required>
          <Input
            value={config.saturdayWorkingHours}
            onChange={setField('saturdayWorkingHours')}
            disabled={disabled}
          />
        </SettingsField>
        <div className='md:col-span-2'>
          <AdmissionLinksEditor
            links={config.admissionLinks}
            disabled={disabled}
            onChange={(admissionLinks) => onChange((current) => ({ ...current, admissionLinks }))}
          />
        </div>
      </div>
    </section>
  );
}

export default ContactSettingsForm;
