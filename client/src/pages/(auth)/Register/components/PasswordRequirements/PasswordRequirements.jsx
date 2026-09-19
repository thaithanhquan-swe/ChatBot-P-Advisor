const PASSWORD_RULES = ['8 ký tự', '1 chữ hoa', '1 chữ thường', '1 số', '1 ký tự đặc biệt'];

const PasswordRequirements = () => (
  <div className='rounded-xl bg-(--surface-muted) p-4'>
    <p className='text-[12.5px] font-medium text-gray-700'>Mật khẩu phải có ít nhất:</p>
    <div className='mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5'>
      {PASSWORD_RULES.map((rule) => (
        <span key={rule} className='flex items-center gap-1.5 text-xs text-(--text-secondary)'>
          <span className='h-1.5 w-1.5 rounded-full bg-(--primary-color)' />
          {rule}
        </span>
      ))}
    </div>
  </div>
);

export default PasswordRequirements;
