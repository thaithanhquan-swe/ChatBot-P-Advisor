function SettingsField({ label, hint, required, children }) {
  return (
    <label className='block'>
      <span className='mb-2 block text-xs font-semibold text-slate-700'>
        {label}
        {required && <span className='ml-1 text-[#D71920]'>*</span>}
      </span>
      {children}
      {hint && <span className='mt-1.5 block text-[11px] text-slate-500'>{hint}</span>}
    </label>
  );
}

export default SettingsField;
