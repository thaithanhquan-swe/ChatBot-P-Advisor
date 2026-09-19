import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, LoaderCircle, Lock, Mail, Phone, User } from 'lucide-react';

import AuthField from '../../../components/AuthField/AuthField';
import AuthInput from '../../../components/AuthInput/AuthInput';
import TermsAgreement from '../TermsAgreement/TermsAgreement';
import { register } from '@/services/auth-service';
import { getApiErrorMessage } from '@/lib/http';

const initialForm = {
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const visibilityButton = (visible, toggle) => (
    <button
      type='button'
      onClick={toggle}
      aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
      className='text-gray-400 transition hover:text-gray-600'
    >
      {visible ? <EyeOff size={17} /> : <Eye size={17} />}
    </button>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.username.trim().length < 5) {
      setError('Tên đăng nhập phải có ít nhất 5 ký tự.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (!agreed) {
      setError('Bạn cần đồng ý với điều khoản sử dụng và chính sách bảo mật.');
      return;
    }

    setSubmitting(true);
    const registrationData = {
      username: form.username.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    };

    try {
      await register(registrationData);
      navigate('/verify-email', {
        replace: true,
        state: { email: registrationData.email },
      });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Đăng ký không thành công.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <AuthField label='Tên đăng nhập'>
          <AuthInput
            icon={User}
            type='text'
            value={form.username}
            onChange={updateField('username')}
            placeholder='Nhập tên đăng nhập'
            autoComplete='username'
            required
          />
        </AuthField>
        <AuthField label='Email'>
          <AuthInput
            icon={Mail}
            type='email'
            value={form.email}
            onChange={updateField('email')}
            placeholder='Nhập email của bạn'
            autoComplete='email'
            required
          />
        </AuthField>
      </div>

      <AuthField label='Số điện thoại'>
        <AuthInput
          icon={Phone}
          type='tel'
          value={form.phone}
          onChange={updateField('phone')}
          placeholder='Nhập số điện thoại'
          autoComplete='tel'
          required
        />
      </AuthField>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <AuthField label='Mật khẩu'>
          <AuthInput
            icon={Lock}
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={updateField('password')}
            placeholder='Nhập mật khẩu'
            autoComplete='new-password'
            required
            rightElement={visibilityButton(showPassword, () => setShowPassword((value) => !value))}
          />
        </AuthField>
        <AuthField label='Xác nhận mật khẩu'>
          <AuthInput
            icon={Lock}
            type={showConfirm ? 'text' : 'password'}
            value={form.confirmPassword}
            onChange={updateField('confirmPassword')}
            placeholder='Nhập lại mật khẩu'
            autoComplete='new-password'
            required
            rightElement={visibilityButton(showConfirm, () => setShowConfirm((value) => !value))}
          />
        </AuthField>
      </div>

      <TermsAgreement checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />

      {error && <p className='text-sm text-red-600'>{error}</p>}
      <button
        type='submit'
        disabled={submitting}
        className='flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--primary-color) text-[14.5px] font-semibold text-white shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)'
      >
        {submitting ? (
          <>
            <LoaderCircle size={17} className='animate-spin' />
            Đang tạo tài khoản và gửi email...
          </>
        ) : (
          <>
            Đăng ký
            <ArrowRight size={17} />
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
