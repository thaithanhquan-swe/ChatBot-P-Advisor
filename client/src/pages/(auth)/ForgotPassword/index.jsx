import { MailCheck } from 'lucide-react';

import RecoveryShell from '../components/RecoveryShell/RecoveryShell';
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm';

const ForgotPassword = () => (
  <RecoveryShell
    icon={MailCheck}
    title='Quên mật khẩu?'
    description='Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.'
  >
    <ForgotPasswordForm />
  </RecoveryShell>
);

export default ForgotPassword;
