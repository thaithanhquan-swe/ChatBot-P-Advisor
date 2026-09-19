import { Link } from 'react-router-dom';

const TermsAgreement = ({ checked, onChange }) => (
  <label className='flex items-start gap-2.5 text-[13px] text-(--text-secondary)'>
    <input
      type='checkbox'
      checked={checked}
      onChange={onChange}
      className='mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-(--primary-color) focus:ring-(--primary-color-soft)'
    />
    <span>
      Tôi đồng ý với{' '}
      <Link to='#' className='font-medium text-(--primary-color) hover:underline'>
        Điều khoản sử dụng
      </Link>{' '}
      và{' '}
      <Link to='#' className='font-medium text-(--primary-color) hover:underline'>
        Chính sách bảo mật
      </Link>
    </span>
  </label>
);

export default TermsAgreement;
