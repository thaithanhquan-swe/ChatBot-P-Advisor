import { ShieldCheck } from 'lucide-react';

import RecoveryShell from '../components/RecoveryShell/RecoveryShell';
import ResetPasswordForm from './components/ResetPasswordForm/ResetPasswordForm';

const ResetPassword = () => (
  <RecoveryShell
    icon={ShieldCheck}
    title='Đặt lại mật khẩu'
    description='Vui lòng nhập mật khẩu mới cho tài khoản của bạn.'
  >
    <ResetPasswordForm />
  </RecoveryShell>
);

export default ResetPassword;
