import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';

import AuthField from '../../../components/AuthField/AuthField';
import AuthInput from '../../../components/AuthInput/AuthInput';
import PasswordRequirements from '../PasswordRequirements/PasswordRequirements';
import TermsAgreement from '../TermsAgreement/TermsAgreement';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: xử lý đăng ký
  };

  return (
    <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <AuthField label='Họ và tên'>
          <AuthInput icon={User} type='text' placeholder='Nhập họ và tên' />
        </AuthField>
        <AuthField label='Email'>
          <AuthInput icon={Mail} type='email' placeholder='Nhập email của bạn' />
        </AuthField>
      </div>

      <AuthField label='Số điện thoại'>
        <AuthInput icon={Phone} type='tel' placeholder='Nhập số điện thoại' />
      </AuthField>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <AuthField label='Mật khẩu'>
          <AuthInput
            icon={Lock}
            type={showPassword ? 'text' : 'password'}
            placeholder='Nhập mật khẩu'
            rightElement={visibilityButton(showPassword, () => setShowPassword((value) => !value))}
          />
        </AuthField>
        <AuthField label='Xác nhận mật khẩu'>
          <AuthInput
            icon={Lock}
            type={showConfirm ? 'text' : 'password'}
            placeholder='Nhập lại mật khẩu'
            rightElement={visibilityButton(showConfirm, () => setShowConfirm((value) => !value))}
          />
        </AuthField>
      </div>

      <PasswordRequirements />
      <TermsAgreement />

      <button
        type='submit'
        className='flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--primary-color) text-[14.5px] font-semibold text-white shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)'
      >
        Đăng ký
        <ArrowRight size={17} />
      </button>
    </form>
  );
};

export default RegisterForm;
