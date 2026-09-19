import { Eye, EyeOff, Lock } from 'lucide-react';

const PasswordField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  visible,
  onToggleVisibility,
  invalid = false,
  hint,
  error,
}) => (
  <div>
    <label htmlFor={id} className='mb-2 block text-sm font-semibold text-[#202020]'>
      {label} <span className='text-[#d71920]'>*</span>
    </label>
    <div
      className={`flex h-13.5 items-center gap-3 rounded-lg border bg-white px-4 transition focus-within:ring-3 ${invalid ? 'border-red-400 focus-within:ring-red-100' : 'border-[#dedede] focus-within:border-[#d71920] focus-within:ring-[#d71920]/10'}`}
    >
      <Lock size={19} className='shrink-0 text-[#9ca3af]' />
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required
        className='h-full min-w-0 flex-1 bg-transparent text-sm text-[#222] outline-none placeholder:text-[#a3a3a3]'
      />
      <button
        type='button'
        onClick={onToggleVisibility}
        aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
        className='cursor-pointer text-[#8b8b8b] transition hover:text-[#d71920]'
      >
        {visible ? <EyeOff size={19} /> : <Eye size={19} />}
      </button>
    </div>
    {hint && <p className='mt-2 text-xs leading-5 text-[#777]'>{hint}</p>}
    {error && <p className='mt-2 text-xs text-red-600'>{error}</p>}
  </div>
);

export default PasswordField;
