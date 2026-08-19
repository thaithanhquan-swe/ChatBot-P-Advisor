import { NavLink } from 'react-router-dom';

const tabs = [
  { label: 'Đăng nhập', to: '/login' },
  { label: 'Đăng ký', to: '/register' },
];

const AuthCard = ({ children }) => {
  return (
    <div className='w-full overflow-hidden rounded-[20px] border border-[#f1eeee] bg-white shadow-[0_6px_20px_rgba(31,24,25,0.10)]'>
      <div className='grid grid-cols-2'>
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `border-b-2 py-5 text-center text-[15px] font-semibold transition-colors ${
                isActive
                  ? 'border-(--primary-color) text-(--primary-color)'
                  : 'border-(--border-subtle) text-(--text-secondary) hover:text-gray-700'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <div className='p-7'>{children}</div>
    </div>
  );
};

export default AuthCard;
