import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/http';
import { getSystemConfig, updateSystemConfig } from '@/services/system-config-service';
import SettingsHeader from './components/SettingsHeader';
import HeroSettingsForm from './components/HeroSettingsForm';
import ContactSettingsForm from './components/ContactSettingsForm';

const EMPTY_CONFIG = {
  heroBadge: '',
  heroTitle: '',
  heroHighlightedTitle: '',
  heroDescription: '',
  heroSlides: [],
  footerAboutDescription: '',
  admissionLinks: [],
  admissionHotline: '',
  admissionEmail: '',
  websiteUrl: '',
  facebookUrl: '',
  footerPhone: '',
  footerEmail: '',
  footerAddress: '',
  weekdayWorkingHours: '',
  saturdayWorkingHours: '',
};

function Settings() {
  const [config, setConfig] = useState(EMPTY_CONFIG);
  const [savedConfig, setSavedConfig] = useState(EMPTY_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    getSystemConfig()
      .then((result) => {
        if (!active || !result) return;
        const nextConfig = {
          ...EMPTY_CONFIG,
          ...result,
          heroSlides: result.heroSlides ?? [],
          admissionLinks: result.admissionLinks ?? [],
        };
        setConfig(nextConfig);
        setSavedConfig(nextConfig);
      })
      .catch(
        (error) =>
          active && toast.error(getApiErrorMessage(error, 'Không thể tải cấu hình website.'))
      )
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const isDirty = useMemo(
    () => JSON.stringify(config) !== JSON.stringify(savedConfig),
    [config, savedConfig]
  );

  const handleSave = async () => {
    try {
      setSaving(true);
      const result = await updateSystemConfig(config);
      const nextConfig = {
        ...EMPTY_CONFIG,
        ...result,
        heroSlides: result.heroSlides ?? [],
        admissionLinks: result.admissionLinks ?? [],
      };
      setConfig(nextConfig);
      setSavedConfig(nextConfig);
      toast.success('Đã cập nhật nội dung website.');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Không thể cập nhật cấu hình website.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='mx-auto max-w-[1400px]'>
      <SettingsHeader
        dirty={isDirty}
        loading={loading}
        saving={saving}
        onReset={() => setConfig(savedConfig)}
        onSave={handleSave}
      />
      <div className='space-y-5'>
        <HeroSettingsForm config={config} disabled={loading || saving} onChange={setConfig} />
        <ContactSettingsForm config={config} disabled={loading || saving} onChange={setConfig} />
      </div>
    </div>
  );
}

export default Settings;
