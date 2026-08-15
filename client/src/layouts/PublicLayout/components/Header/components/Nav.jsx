import { MessageCircleMore } from 'lucide-react';
import { Link } from 'react-router-dom';

const Nav = ({ navItems }) => {
  return (
    <nav className='h-full items-center gap-8 flex'>
      {navItems.map((item) => (
        <div
          key={item.label}
          className={`group relative flex h-full items-center ${
            item.active ? 'text-(--primary-color)' : 'text-gray-800'
          }`}
        >
          <Link
            to={item.href}
            className={`flex h-full items-center gap-1.5 whitespace-nowrap text-[14px] transition-colors ${
              item.active ? 'font-semibold' : 'font-medium hover:text-(--primary-color)'
            }`}
          >
            {item.icon && <item.icon size={16} />}
            {item.label}
          </Link>

          {item.active && (
            <span className='absolute bottom-3.75 left-0 h-0.5 w-full rounded bg-(--primary-color)' />
          )}
        </div>
      ))}

      <Link
        to='/chat'
        className='flex h-11 items-center justify-center gap-2 text-white rounded-lg bg-(--primary-color) px-5 text-[14px] font-semibold transition-all duration-200 hover:shadow-lg'
      >
        <MessageCircleMore size={16} />
        Bắt đầu trò chuyện
      </Link>
    </nav>
  );
};

export default Nav;
