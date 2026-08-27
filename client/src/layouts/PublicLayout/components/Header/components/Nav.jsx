import { useEffect, useState } from 'react';
import { LogIn, LogOut, UserRound } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authStorage } from '@/lib/auth-storage';
import { getCurrentUser, logout } from '@/services/auth-service';

const Nav = ({ navItems }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!authStorage.getToken()) return;

    let active = true;
    getCurrentUser()
      .then((user) => {
        if (active) setCurrentUser(user);
      })
      .catch(() => {
        if (active) setCurrentUser(null);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setCurrentUser(null);
      navigate('/', { replace: true });
    }
  };

  return (
    <nav className='flex h-full items-center gap-8'>
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

      {currentUser ? (
        <div className='flex items-center gap-3'>
          <span className='flex h-11 items-center gap-2 rounded-lg bg-gray-100 px-4 text-[14px] font-semibold text-gray-800'>
            <UserRound size={17} className='text-(--primary-color)' />
            {currentUser.username}
          </span>
          <button
            type='button'
            onClick={handleLogout}
            className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--primary-color) px-5 text-[14px] font-semibold text-white transition-all duration-200 hover:shadow-lg'
          >
            <LogOut size={16} />
            Đăng xuất
          </button>
        </div>
      ) : (
        <Link
          to='/login'
          className='flex h-11 items-center justify-center gap-2 rounded-lg bg-(--primary-color) px-5 text-[14px] font-semibold text-white transition-all duration-200 hover:shadow-lg'
        >
          <LogIn size={16} />
          Đăng nhập
        </Link>
      )}
    </nav>
  );
};

export default Nav;
