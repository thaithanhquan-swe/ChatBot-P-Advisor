import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleIcon } from '@/assets/icons';
import { getFirebaseAuth } from '@/lib/firebase';
import { firebaseLogin } from '@/services/auth-service';
import { getApiErrorMessage } from '@/lib/http';

const firebaseErrorMessages = {
  'auth/popup-closed-by-user': 'Bạn đã đóng cửa sổ đăng nhập Google.',
  'auth/popup-blocked': 'Trình duyệt đã chặn cửa sổ đăng nhập Google.',
  'auth/cancelled-popup-request': 'Yêu cầu đăng nhập Google đã bị hủy.',
  'auth/unauthorized-domain': 'Tên miền này chưa được cấp quyền trong Firebase.',
};

const SocialAuth = ({ label }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleAuth = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError('');

    try {
      const firebaseAuth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(firebaseAuth, provider);
      const idToken = await result.user.getIdToken();
      await firebaseLogin(idToken);
      navigate('/', { replace: true });
    } catch (requestError) {
      setError(
        firebaseErrorMessages[requestError.code]
          || getApiErrorMessage(requestError, 'Đăng nhập Google không thành công.'),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className='relative my-6 text-center text-[12.5px] text-gray-400'>
        <span className='relative z-10 bg-white px-3'>{label}</span>
        <div className='absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-200' />
      </div>

      <button
        type='button'
        disabled={submitting}
        onClick={handleGoogleAuth}
        className='flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 text-[13.5px] font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
      >
        {submitting ? <LoaderCircle size={18} className='animate-spin' /> : <GoogleIcon size={18} />}
        {submitting ? 'Đang xác thực...' : 'Google'}
      </button>

      {error && <p className='mt-3 text-center text-[13px] text-red-600'>{error}</p>}
    </div>
  );
};

export default SocialAuth;
