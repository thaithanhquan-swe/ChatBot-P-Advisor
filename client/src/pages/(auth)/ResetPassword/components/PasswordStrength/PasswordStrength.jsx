const STRENGTH_LABELS = ['Chưa có mật khẩu', 'Rất yếu', 'Yếu', 'Trung bình', 'Khá mạnh', 'Mạnh'];

const PasswordStrength = ({ strength }) => (
  <div className='pt-1'>
    <div className='mb-3 flex items-center justify-between gap-3 text-[13px] text-[#666]'>
      <span>Độ mạnh mật khẩu:</span>
      <span>{STRENGTH_LABELS[strength]}</span>
    </div>
    <div className='grid grid-cols-5 gap-2'>
      {[1, 2, 3, 4, 5].map((level) => (
        <span
          key={level}
          className={`h-1.25 rounded-full transition-all ${strength >= level ? 'bg-[#d71920]' : 'bg-[#e5e7eb]'}`}
        />
      ))}
    </div>
  </div>
);

export default PasswordStrength;
