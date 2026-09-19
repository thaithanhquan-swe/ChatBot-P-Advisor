import { useEffect, useState } from 'react';
import {
  CircleQuestionMark,
  FileText,
  House,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  MessageCircleMore,
  User,
  UserRound,
  X,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authStorage } from '@/lib/auth-storage';
import { logout } from '@/services/auth-service';
import { getCurrentUser } from '@/services/user-service';

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!authStorage.getToken()) return;

    let active = true;
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        if (active) setCurrentUser(user);
      } catch {
        if (active) setCurrentUser(null);
      }
    };

    fetchCurrentUser();

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setCurrentUser(null);
      setIsMenuOpen(false);
      navigate('/', { replace: true });
    }
  };

  const canAccessAdmin = currentUser?.roles?.some(
    (role) => role.name === 'ADMIN' || role.name === 'ADVISOR'
  );
  const navItems = [
    { label: 'Trang chủ', href: '/', icon: House },
    { label: 'Trang chat', href: '/chatai', icon: MessageCircleMore },
    { label: 'FAQ', href: '/faq', icon: CircleQuestionMark },
    { label: 'Tài liệu', href: '/documents', icon: FileText },
    { label: 'Yêu cầu tư vấn', href: '/consultation-request', icon: User },
    ...(canAccessAdmin ? [{ label: 'Trang quản trị', href: '/admin', icon: LayoutDashboard }] : []),
  ];

  const renderNavItems = (mobile = false) =>
    navItems.map((item) => {
      const isActive =
        item.href !== '#' &&
        (item.href === '/'
          ? pathname === '/'
          : pathname === item.href || pathname.startsWith(`${item.href}/`));

      if (mobile) {
        return (
          <Link
            key={item.label}
            to={item.href}
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? 'bg-red-50 font-semibold text-(--primary-color)'
                : 'font-medium text-gray-800 hover:bg-gray-50 hover:text-(--primary-color)'
            }`}
          >
            {item.icon && <item.icon size={18} />}
            {item.label}
          </Link>
        );
      }

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
    });

  return (
    <>
      <nav className='hidden h-full items-center gap-8 lg:flex'>
        {renderNavItems()}

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

      <button
        type='button'
        aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-800 transition-colors hover:bg-gray-100 lg:hidden'
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <nav className='absolute inset-x-0 top-full border-t border-gray-100 bg-white px-4 py-3 shadow-lg lg:hidden'>
          <div className='mx-auto flex max-w-350 flex-col gap-1'>
            {renderNavItems(true)}

            <div className='mt-2 border-t border-gray-100 pt-3'>
              {currentUser ? (
                <div className='flex flex-col gap-2'>
                  <span className='flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-800'>
                    <UserRound size={18} className='text-(--primary-color)' />
                    {currentUser.username}
                  </span>
                  <button
                    type='button'
                    onClick={handleLogout}
                    className='flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--primary-color) px-4 py-2.5 text-sm font-semibold text-white'
                  >
                    <LogOut size={17} />
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <Link
                  to='/login'
                  onClick={() => setIsMenuOpen(false)}
                  className='flex items-center justify-center gap-2 rounded-lg bg-(--primary-color) px-4 py-2.5 text-sm font-semibold text-white'
                >
                  <LogIn size={17} />
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Nav;
