import { useSystemConfig } from '@/contexts/system-config-context';

const FooterWorkingTime = () => {
  const { config } = useSystemConfig();
  if (!config) return null;
  return (
    <div>
      <h3 className='mb-4 text-[15px] font-bold uppercase'>Thời gian làm việc</h3>

      <div className='space-y-2 text-[13px] leading-[1.6] text-white/90'>
        <p>{config.weekdayWorkingHours}</p>

        <p>{config.saturdayWorkingHours}</p>
      </div>
    </div>
  );
};

export default FooterWorkingTime;
