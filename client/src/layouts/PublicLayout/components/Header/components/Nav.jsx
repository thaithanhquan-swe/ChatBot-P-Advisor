import { LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Nav = ({ navItems }) => {
  const { pathname } = useLocation();
  return (
    <nav className='h-full items-center gap-8 flex'>
      {navItems.map((item) => {
        const isActive =
          item.href !== '#' &&
          (item.href === '/'
            ? pathname === '/'
            : pathname === item.href || pathname.startsWith(`${item.href}/`));

        return (
          <div
            key={item.label}
            className={`group relative flex h-full items-center ${
              isActive ? 'text-(--primary-color)' : 'text-gray-800'
            }`}
          >
            <Link
              to={item.href}
              className={`flex h-full items-center gap-1.5 whitespace-nowrap text-[14px] transition-colors duration-300 ${
                isActive ? 'font-semibold' : 'font-medium hover:text-(--primary-color)'
              }`}
            >
              {item.icon && <item.icon size={16} />}
              {item.label}
            </Link>

            <span
              className={`absolute bottom-3.75 left-0 h-0.5 w-full origin-center rounded bg-(--primary-color) transition-all duration-300 ease-out ${
                isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
            />
          </div>
        );
      })}

      <Link
        to='/login'
        className='flex h-11 items-center justify-center gap-2 text-white rounded-lg bg-(--primary-color) px-5 text-[14px] font-semibold transition-all duration-200 hover:shadow-lg'
      >
        <LogIn size={16} />
        Đăng nhập
      </Link>
    </nav>
  );
};

export default Nav;
