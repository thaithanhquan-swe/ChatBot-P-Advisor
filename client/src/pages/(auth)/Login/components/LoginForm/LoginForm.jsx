import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react';

import AuthField from '../../../components/AuthField/AuthField';
import AuthInput from '../../../components/AuthInput/AuthInput';
import { login } from '@/services/auth-service';
import { getApiErrorMessage } from '@/lib/http';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim() || !password) return;
    setSubmitting(true);
    setError('');
    try {
      await login({ username: username.trim(), password });
      navigate('/', { replace: true });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Đăng nhập không thành công.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
      <AuthField label='Tên đăng nhập'>
        <AuthInput
          icon={User}
          type='text'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder='Nhập tên đăng nhập'
          autoComplete='username'
        />
      </AuthField>

      <AuthField label='Mật khẩu'>
        <AuthInput
          icon={Lock}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Nhập mật khẩu'
          autoComplete='current-password'
          rightElement={
            <button
              type='button'
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              className='text-gray-400 transition hover:text-gray-600'
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />
      </AuthField>

      <div className='flex justify-end'>
        <Link
          to='/forgot-password'
          className='text-[13px] font-medium text-(--primary-color) hover:underline'
        >
          Quên mật khẩu?
        </Link>
      </div>

      {error && <p className='text-sm text-red-600'>{'Mật khẩu hoặc tài khoản không chính xác'}</p>}

      <button
        type='submit'
        disabled={submitting || !username.trim() || !password}
        className='flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--primary-color) text-[14.5px] font-semibold text-white shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)'
      >
        {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        <ArrowRight size={17} />
      </button>
    </form>
  );
};

export default LoginForm;
