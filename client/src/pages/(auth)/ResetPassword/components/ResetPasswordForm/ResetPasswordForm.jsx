import { useMemo, useState } from 'react';
import { Lock } from 'lucide-react';

import PasswordField from '../PasswordField/PasswordField';
import PasswordStrength from '../PasswordStrength/PasswordStrength';

const PASSWORD_HINT =
  'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = useMemo(() => {
    if (!password) return 0;
    return [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ].filter(Boolean).length;
  }, [password]);

  const passwordsMatch = !confirmPassword || password === confirmPassword;
  const canSubmit = strength === 5 && password === confirmPassword;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    // TODO: Gọi API reset-password với token và mật khẩu mới.
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <PasswordField
        id='new-password'
        label='Mật khẩu mới'
        value={password}
        onChange={setPassword}
        placeholder='Nhập mật khẩu mới'
        visible={showPassword}
        onToggleVisibility={() => setShowPassword((value) => !value)}
        hint={PASSWORD_HINT}
      />
      <PasswordField
        id='confirm-password'
        label='Xác nhận mật khẩu mới'
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder='Nhập lại mật khẩu mới'
        visible={showConfirm}
        onToggleVisibility={() => setShowConfirm((value) => !value)}
        invalid={!passwordsMatch}
        error={!passwordsMatch ? 'Mật khẩu xác nhận chưa khớp.' : ''}
      />
      <PasswordStrength strength={strength} />

      <div className='flex gap-3 rounded-lg bg-[#fff2f2] px-4 py-4 text-[#4b4b4b]'>
        <Lock size={21} className='mt-0.5 shrink-0 text-[#d71920]' />
        <div className='text-[13px] leading-6'>
          <p>Vì lý do bảo mật, liên kết đặt lại mật khẩu sẽ hết hạn sau 15 phút.</p>
          <p>Vui lòng thực hiện lại nếu liên kết đã hết hạn.</p>
        </div>
      </div>

      {success && (
        <div className='rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700'>
          Đặt lại mật khẩu thành công. Bạn có thể quay lại trang đăng nhập.
        </div>
      )}

      <button
        type='submit'
        disabled={!canSubmit}
        className='flex h-13.5 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d71920] text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(215,25,32,0.16)] transition hover:bg-[#bd1118] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50'
      >
        <Lock size={18} />
        Đặt lại mật khẩu
      </button>
    </form>
  );
};

export default ResetPasswordForm;
